import type { Metadata } from "next";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "YousicPlay privacy policy. Learn how we collect, use, and protect your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-cream">
      <section className="py-20">
        <MaxWidthWrapper className="max-w-3xl">
          <h1 className="mb-10 font-poppins text-4xl font-bold uppercase tracking-tight text-navy">
            Privacy Policy
          </h1>
          <div className="prose-navy space-y-8 font-serif text-base leading-relaxed text-navy/80">
            <p>
              <strong>Last updated:</strong> January 1, 2025
            </p>

            <div>
              <h2 className="mb-3 font-poppins text-xl font-bold text-navy">1. Information We Collect</h2>
              <p>
                We collect information you provide directly to us, such as when you create an account,
                make a purchase, sign up for our newsletter, or contact us for support. This may include
                your name, email address, payment information, and any other information you choose to provide.
              </p>
            </div>

            <div>
              <h2 className="mb-3 font-poppins text-xl font-bold text-navy">2. How We Use Your Information</h2>
              <p>
                We use the information we collect to provide, maintain, and improve our services, process
                transactions, send you technical notices and support messages, and respond to your comments
                and questions.
              </p>
            </div>

            <div>
              <h2 className="mb-3 font-poppins text-xl font-bold text-navy">3. Information Sharing</h2>
              <p>
                We do not sell, trade, or otherwise transfer your personal information to outside parties
                except as described in this policy. We may share information with trusted third parties who
                assist us in operating our website, conducting our business, or serving our users.
              </p>
            </div>

            <div>
              <h2 className="mb-3 font-poppins text-xl font-bold text-navy">4. Data Security</h2>
              <p>
                We implement a variety of security measures to maintain the safety of your personal
                information. Your personal information is contained behind secured networks and is only
                accessible by a limited number of persons who have special access rights.
              </p>
            </div>

            <div>
              <h2 className="mb-3 font-poppins text-xl font-bold text-navy">5. Cookies</h2>
              <p>
                We use cookies to understand and save your preferences for future visits, keep track of
                advertisements, and compile aggregate data about site traffic and site interaction so that
                we can offer better site experiences and tools in the future.
              </p>
            </div>

            <div>
              <h2 className="mb-3 font-poppins text-xl font-bold text-navy">6. Third-Party Links</h2>
              <p>
                Occasionally, at our discretion, we may include or offer third-party products or services
                on our website. These third-party sites have separate and independent privacy policies.
                We therefore have no responsibility or liability for the content and activities of these
                linked sites.
              </p>
            </div>

            <div>
              <h2 className="mb-3 font-poppins text-xl font-bold text-navy">7. Your Rights</h2>
              <p>
                You have the right to access, correct, or delete your personal data. You may also opt out
                of marketing communications at any time by clicking the unsubscribe link in our emails or
                contacting us directly.
              </p>
            </div>

            <div>
              <h2 className="mb-3 font-poppins text-xl font-bold text-navy">8. Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify you of any changes by
                posting the new privacy policy on this page and updating the &ldquo;Last updated&rdquo; date.
              </p>
            </div>

            <div>
              <h2 className="mb-3 font-poppins text-xl font-bold text-navy">9. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:support@yousicplay.com" className="text-magenta hover:underline">
                  support@yousicplay.com
                </a>
                .
              </p>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
