import type { Metadata } from "next";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "YousicPlay terms of service. Read our terms and conditions for using our platform.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-cream">
      <section className="py-20">
        <MaxWidthWrapper className="max-w-3xl">
          <h1 className="mb-10 font-poppins text-4xl font-bold uppercase tracking-tight text-navy">
            Terms of Service
          </h1>
          <div className="space-y-8 font-serif text-base leading-relaxed text-navy/80">
            <p>
              <strong>Last updated:</strong> January 1, 2025
            </p>

            <div>
              <h2 className="mb-3 font-poppins text-xl font-bold text-navy">1. Acceptance of Terms</h2>
              <p>
                By accessing and using YousicPlay&apos;s website and services, you accept and agree to be
                bound by these Terms of Service. If you do not agree to these terms, please do not use
                our services.
              </p>
            </div>

            <div>
              <h2 className="mb-3 font-poppins text-xl font-bold text-navy">2. Description of Services</h2>
              <p>
                YousicPlay provides online music education courses taught by professional musicians. Our
                services include video lessons, downloadable materials, and community features. Access to
                courses is granted upon purchase and is subject to these terms.
              </p>
            </div>

            <div>
              <h2 className="mb-3 font-poppins text-xl font-bold text-navy">3. Account Registration</h2>
              <p>
                To purchase and access courses, you must create an account. You are responsible for
                maintaining the confidentiality of your account credentials and for all activities that
                occur under your account.
              </p>
            </div>

            <div>
              <h2 className="mb-3 font-poppins text-xl font-bold text-navy">4. Purchases and Payments</h2>
              <p>
                All purchases are processed through our secure payment platform. Prices are listed in
                USD and are subject to change. By making a purchase, you authorize us to charge your
                selected payment method.
              </p>
            </div>

            <div>
              <h2 className="mb-3 font-poppins text-xl font-bold text-navy">5. Refund Policy</h2>
              <p>
                We offer a 14-day refund policy on all course purchases. If you are not satisfied with
                your purchase, you may request a full refund within 14 days of purchase. Refund requests
                should be sent to our support team.
              </p>
            </div>

            <div>
              <h2 className="mb-3 font-poppins text-xl font-bold text-navy">6. Intellectual Property</h2>
              <p>
                All course content, including videos, text, graphics, and logos, is the property of
                YousicPlay or its content providers and is protected by copyright law. You may not
                reproduce, distribute, or create derivative works from any content without express
                written permission.
              </p>
            </div>

            <div>
              <h2 className="mb-3 font-poppins text-xl font-bold text-navy">7. User Conduct</h2>
              <p>
                You agree to use our services only for lawful purposes. You may not share your account
                credentials, redistribute course content, or engage in any activity that disrupts or
                interferes with our services.
              </p>
            </div>

            <div>
              <h2 className="mb-3 font-poppins text-xl font-bold text-navy">8. Limitation of Liability</h2>
              <p>
                YousicPlay shall not be liable for any indirect, incidental, special, consequential, or
                punitive damages resulting from your use of or inability to use our services.
              </p>
            </div>

            <div>
              <h2 className="mb-3 font-poppins text-xl font-bold text-navy">9. Modifications</h2>
              <p>
                We reserve the right to modify these terms at any time. Changes will be effective
                immediately upon posting. Your continued use of our services after changes constitutes
                acceptance of the modified terms.
              </p>
            </div>

            <div>
              <h2 className="mb-3 font-poppins text-xl font-bold text-navy">10. Contact Us</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at{" "}
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
