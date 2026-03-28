/**
 * Klaviyo API integration.
 * Uses the Klaviyo v2024-10-15 API (latest revision).
 *
 * Environment variable: KLAVIYO_API_KEY (private API key)
 *
 * Docs: https://developers.klaviyo.com/en/reference/api_overview
 */

const KLAVIYO_API_KEY = process.env.KLAVIYO_API_KEY;
const KLAVIYO_BASE_URL = "https://a.klaviyo.com/api";
const KLAVIYO_REVISION = "2024-10-15";

function headers() {
  return {
    Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
    "Content-Type": "application/json",
    revision: KLAVIYO_REVISION,
  };
}

function isConfigured(): boolean {
  return !!KLAVIYO_API_KEY;
}

// ── Profile Management ─────────────────────────────────────────────────

/**
 * Create or update a Klaviyo profile.
 * Returns the Klaviyo profile ID.
 */
export async function upsertProfile({
  email,
  firstName,
  lastName,
  source,
  properties,
}: {
  email: string;
  firstName?: string;
  lastName?: string;
  source?: string;
  properties?: Record<string, unknown>;
}): Promise<string | null> {
  if (!isConfigured()) {
    console.log("[Klaviyo] Not configured — skipping profile upsert");
    return null;
  }

  try {
    const res = await fetch(`${KLAVIYO_BASE_URL}/profile-import/`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({
        data: {
          type: "profile",
          attributes: {
            email: email.toLowerCase().trim(),
            first_name: firstName || undefined,
            last_name: lastName || undefined,
            properties: {
              ...properties,
              source: source || "website",
            },
          },
        },
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("[Klaviyo] Profile upsert failed:", res.status, errorText);
      return null;
    }

    const data = await res.json();
    return data.data?.id || null;
  } catch (error) {
    console.error("[Klaviyo] Profile upsert error:", error);
    return null;
  }
}

// ── Event Tracking ─────────────────────────────────────────────────────

/**
 * Track an event for a profile (identified by email).
 * Common events: "Placed Order", "Email Captured", "Course Started"
 */
export async function trackEvent({
  email,
  eventName,
  properties,
  value,
  uniqueId,
}: {
  email: string;
  eventName: string;
  properties?: Record<string, unknown>;
  value?: number;
  uniqueId?: string;
}): Promise<boolean> {
  if (!isConfigured()) {
    console.log(`[Klaviyo] Not configured — skipping event "${eventName}"`);
    return false;
  }

  try {
    const res = await fetch(`${KLAVIYO_BASE_URL}/events/`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({
        data: {
          type: "event",
          attributes: {
            metric: {
              data: {
                type: "metric",
                attributes: {
                  name: eventName,
                },
              },
            },
            profile: {
              data: {
                type: "profile",
                attributes: {
                  email: email.toLowerCase().trim(),
                },
              },
            },
            properties: properties || {},
            value: value || undefined,
            unique_id: uniqueId || undefined,
            time: new Date().toISOString(),
          },
        },
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`[Klaviyo] Event "${eventName}" failed:`, res.status, errorText);
      return false;
    }

    return true;
  } catch (error) {
    console.error(`[Klaviyo] Event "${eventName}" error:`, error);
    return false;
  }
}

// ── Add to List ────────────────────────────────────────────────────────

/**
 * Subscribe a profile to a Klaviyo list.
 * listId is the Klaviyo list ID (found in Klaviyo dashboard → Lists → list ID in URL).
 */
export async function addToList({
  email,
  listId,
}: {
  email: string;
  listId: string;
}): Promise<boolean> {
  if (!isConfigured()) {
    console.log("[Klaviyo] Not configured — skipping list subscription");
    return false;
  }

  try {
    const res = await fetch(
      `${KLAVIYO_BASE_URL}/lists/${listId}/relationships/profiles/`,
      {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({
          data: [
            {
              type: "profile",
              id: email, // Klaviyo resolves by email
            },
          ],
        }),
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("[Klaviyo] List subscribe failed:", res.status, errorText);
      return false;
    }

    return true;
  } catch (error) {
    console.error("[Klaviyo] List subscribe error:", error);
    return false;
  }
}

// ── Convenience Methods ────────────────────────────────────────────────

/**
 * Track an email capture event and create/update the profile.
 */
export async function trackEmailCapture({
  email,
  name,
  source,
  pageUrl,
}: {
  email: string;
  name?: string;
  source?: string;
  pageUrl?: string;
}) {
  const [firstName, ...lastParts] = (name || "").split(" ");
  const lastName = lastParts.join(" ");

  // Create/update profile
  await upsertProfile({
    email,
    firstName: firstName || undefined,
    lastName: lastName || undefined,
    source,
    properties: {
      signup_page: pageUrl,
      signup_date: new Date().toISOString(),
    },
  });

  // Track the event
  await trackEvent({
    email,
    eventName: "Email Captured",
    properties: {
      source: source || "unknown",
      page_url: pageUrl,
    },
  });

  // Add to main email list if configured
  const mainListId = process.env.KLAVIYO_MAIN_LIST_ID;
  if (mainListId) {
    await addToList({ email, listId: mainListId });
  }
}

/**
 * Track a purchase event — called from the Stripe webhook handler.
 */
export async function trackPurchase({
  email,
  customerName,
  slug,
  itemType,
  productName,
  amount,
  currency,
  stripePaymentId,
}: {
  email: string;
  customerName?: string;
  slug: string;
  itemType: string;
  productName: string;
  amount: number;
  currency: string;
  stripePaymentId: string;
}) {
  const [firstName, ...lastParts] = (customerName || "").split(" ");
  const lastName = lastParts.join(" ");

  // Update profile with purchase data
  await upsertProfile({
    email,
    firstName: firstName || undefined,
    lastName: lastName || undefined,
    properties: {
      last_purchase_date: new Date().toISOString(),
      last_purchase_item: productName,
    },
  });

  // Track Placed Order event (Klaviyo's standard e-commerce event name)
  await trackEvent({
    email,
    eventName: "Placed Order",
    value: amount / 100, // Convert cents to dollars
    uniqueId: stripePaymentId,
    properties: {
      OrderId: stripePaymentId,
      ItemNames: [productName],
      Categories: [itemType],
      Items: [
        {
          ProductID: slug,
          ProductName: productName,
          ItemPrice: amount / 100,
          Quantity: 1,
          ProductURL: `https://yousicplay.com/${itemType === "course" ? "classes" : itemType === "bundle" ? "bundles" : "products"}/${slug}`,
        },
      ],
      "$value": amount / 100,
      currency: currency.toUpperCase(),
    },
  });
}
