import { describe, it, expect } from "vitest";
import { resolveCheckoutItem } from "@/lib/checkout";

describe("resolveCheckoutItem", () => {
  it('resolves a course slug to a CheckoutItem', () => {
    const item = resolveCheckoutItem("cory-henry-workshop", "course");
    expect(item).not.toBeNull();
    expect(item!.slug).toBe("cory-henry-workshop");
    expect(item!.itemType).toBe("course");
    expect(item!.title).toBe("Learn to Play Professional Piano Solos, in 30 Days or Less");
    expect(item!.price).toBe(99);
    expect(item!.buyUrl).toBe("https://courses.yousicplay.com/enroll/2798957");
  });

  it('resolves a product slug to a CheckoutItem', () => {
    const item = resolveCheckoutItem("gospel-piano-intro", "product");
    expect(item).not.toBeNull();
    expect(item!.slug).toBe("gospel-piano-intro");
    expect(item!.itemType).toBe("product");
    expect(item!.title).toBe("How to Play Gospel Piano with Your Own Unique Sound");
    expect(item!.price).toBe(0);
  });

  it('resolves a bundle slug to a CheckoutItem', () => {
    const item = resolveCheckoutItem("all-courses", "bundle");
    expect(item).not.toBeNull();
    expect(item!.slug).toBe("all-courses");
    expect(item!.itemType).toBe("bundle");
    expect(item!.title).toBe("YousicPlay ALL Course Bundle");
    expect(item!.price).toBe(99);
  });

  it("returns null for an unknown slug", () => {
    const item = resolveCheckoutItem("nonexistent-course", "course");
    expect(item).toBeNull();
  });

  it("returns null for an invalid itemType", () => {
    const item = resolveCheckoutItem("cory-henry-workshop", "invalid" as any);
    expect(item).toBeNull();
  });

  it("returned item has all required fields", () => {
    const item = resolveCheckoutItem("piano-bundle", "bundle");
    expect(item).not.toBeNull();
    expect(item).toHaveProperty("slug");
    expect(item).toHaveProperty("itemType");
    expect(item).toHaveProperty("title");
    expect(item).toHaveProperty("price");
    expect(item).toHaveProperty("buyUrl");
    expect(item).toHaveProperty("imagePath");

    expect(typeof item!.slug).toBe("string");
    expect(typeof item!.itemType).toBe("string");
    expect(typeof item!.title).toBe("string");
    expect(typeof item!.price).toBe("number");
    expect(typeof item!.buyUrl).toBe("string");
    expect(typeof item!.imagePath).toBe("string");
  });
});
