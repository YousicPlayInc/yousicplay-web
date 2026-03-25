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
          <div className="space-y-8 font-serif text-base leading-relaxed text-navy/80">
            <p>
              <strong>Last updated:</strong> March 25, 2026
            </p>

            <p>
              YousicPlay (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) operates the
              YousicPlay mobile application. This Privacy Policy explains how we collect, use, and
              protect your information when you use our app.
            </p>

            <div>
              <h2 className="mb-3 font-poppins text-xl font-bold text-navy">
                1. Information You Provide
              </h2>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  <strong>Email Address</strong> &mdash; Collected when you sign in using email (OTP
                  verification). Used to create and manage your account.
                </li>
                <li>
                  <strong>Name</strong> &mdash; Collected through Apple Sign-In or when you edit your
                  profile. Used to personalize your experience.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-3 font-poppins text-xl font-bold text-navy">
                2. Information Collected Automatically
              </h2>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  <strong>User Identifiers</strong> &mdash; We generate internal user IDs to manage
                  your account. If you connect Spotify, we store your Spotify user ID to enable song
                  integration. If you sign in with Apple, we store the Apple-provided user identifier.
                </li>
                <li>
                  <strong>Game and Learning Data</strong> &mdash; We collect your game scores, learning
                  progress, practice session data, and Y-Score assessments to track your musical
                  development and personalize your learning experience.
                </li>
                <li>
                  <strong>Lydi AI Conversations</strong> &mdash; When you chat with Lydi (our AI music
                  tutor), your text messages and conversation history are sent to our backend servers
                  for processing by an AI language model. This includes the content of your messages
                  and context about your current learning progress (such as your skill level and recent
                  activities) to provide personalized music tutoring. Conversation data is used solely
                  to power the tutoring experience.
                </li>
                <li>
                  <strong>Audio Data</strong> &mdash; If you use Lydi&apos;s voice features, microphone
                  audio is processed to enable spoken conversations. Audio is used solely for the
                  conversation and is not stored permanently.
                </li>
                <li>
                  <strong>Device Identifier</strong> &mdash; If you use the app as a guest (without
                  creating an account), we use your device&apos;s vendor identifier to maintain your
                  guest session across app launches. This identifier is not linked to your identity.
                </li>
                <li>
                  <strong>Purchase History</strong> &mdash; If you subscribe to YousicPlay Pro, your
                  subscription transaction is verified with our backend to manage your subscription
                  status and feature access.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-3 font-poppins text-xl font-bold text-navy">
                3. Information We Do NOT Collect
              </h2>
              <p>
                We do not collect location data, contacts, photos, health data, financial information
                (beyond subscription verification), browsing history, search history, advertising data,
                or diagnostics.
              </p>
            </div>

            <div>
              <h2 className="mb-3 font-poppins text-xl font-bold text-navy">
                4. How We Use Your Information
              </h2>
              <p className="mb-3">
                All data we collect is used exclusively for app functionality:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Authenticating your account</li>
                <li>Personalizing your learning experience</li>
                <li>Tracking your musical progress and scores</li>
                <li>Enabling AI tutoring conversations with Lydi (text and voice)</li>
                <li>Providing personalized coaching based on your learning context</li>
                <li>Managing your subscription and feature access</li>
                <li>Maintaining guest sessions across app restarts</li>
              </ul>
              <p className="mt-3">
                We do <strong>not</strong> use your data for advertising, tracking, or profiling purposes.
              </p>
            </div>

            <div>
              <h2 className="mb-3 font-poppins text-xl font-bold text-navy">
                5. Data Storage and Security
              </h2>
              <ul className="ml-6 list-disc space-y-2">
                <li>Authentication tokens (JWT) are stored securely in your device&apos;s Keychain.</li>
                <li>Learning preferences are stored locally on your device.</li>
                <li>Account data and progress are stored on our secure backend servers (AWS).</li>
                <li>All network communication uses HTTPS encryption.</li>
              </ul>
            </div>

            <div>
              <h2 className="mb-3 font-poppins text-xl font-bold text-navy">
                6. Third-Party Services
              </h2>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  <strong>Apple Sign-In</strong> &mdash; Authentication is handled by Apple. We receive
                  only your name and a unique identifier. See{" "}
                  <a href="https://www.apple.com/privacy/" className="text-magenta hover:underline">
                    Apple&apos;s Privacy Policy
                  </a>.
                </li>
                <li>
                  <strong>Spotify</strong> &mdash; If you connect your Spotify account, we access your
                  playlists and song data to enable song-based learning. We do not access your Spotify
                  listening history. See{" "}
                  <a href="https://www.spotify.com/privacy/" className="text-magenta hover:underline">
                    Spotify&apos;s Privacy Policy
                  </a>.
                </li>
                <li>
                  <strong>AI Services</strong> &mdash; Lydi chat conversations are processed using AI
                  language models hosted on our backend infrastructure. Your messages are sent to the AI
                  model to generate tutoring responses. We do not share your conversation data with third
                  parties for their own purposes.
                </li>
                <li>
                  <strong>Firebase</strong> &mdash; Used for app infrastructure. See{" "}
                  <a href="https://policies.google.com/privacy" className="text-magenta hover:underline">
                    Google&apos;s Privacy Policy
                  </a>.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-3 font-poppins text-xl font-bold text-navy">
                7. Children&apos;s Privacy
              </h2>
              <p>
                YousicPlay is not directed at children under 13. We do not knowingly collect personal
                information from children under 13. If you believe we have collected information from a
                child under 13, please contact us and we will delete it promptly.
              </p>
            </div>

            <div>
              <h2 className="mb-3 font-poppins text-xl font-bold text-navy">
                8. Your Rights
              </h2>
              <p>You may:</p>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  <strong>Access</strong> your data through your profile settings
                </li>
                <li>
                  <strong>Delete</strong> your account and associated data by contacting us at{" "}
                  <a href="mailto:support@yousicplay.com" className="text-magenta hover:underline">
                    support@yousicplay.com
                  </a>
                </li>
                <li>
                  <strong>Opt out</strong> of optional data collection by using the app as a guest
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-3 font-poppins text-xl font-bold text-navy">
                9. Data Retention
              </h2>
              <p>
                We retain your data for as long as your account is active. If you delete your account,
                we will remove your personal data within 30 days, except where retention is required by law.
              </p>
            </div>

            <div>
              <h2 className="mb-3 font-poppins text-xl font-bold text-navy">
                10. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of significant
                changes through the app or via email. Continued use of the app after changes constitutes
                acceptance of the updated policy.
              </p>
            </div>

            <div>
              <h2 className="mb-3 font-poppins text-xl font-bold text-navy">
                11. Contact Us
              </h2>
              <p>
                If you have questions about this Privacy Policy or your data, contact us at{" "}
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
