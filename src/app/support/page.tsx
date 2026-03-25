import type { Metadata } from "next";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";

export const metadata: Metadata = {
  title: "Support",
  description: "Get help with YousicPlay. FAQ, troubleshooting, and contact information.",
};

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-cream">
      <section className="py-20">
        <MaxWidthWrapper className="max-w-3xl">
          <h1 className="mb-10 font-poppins text-4xl font-bold uppercase tracking-tight text-navy">
            Support
          </h1>
          <div className="space-y-8 font-serif text-base leading-relaxed text-navy/80">
            <p>
              Having trouble with YousicPlay? We&apos;re here to help.
            </p>

            <div>
              <h2 className="mb-3 font-poppins text-xl font-bold text-navy">Contact Us</h2>
              <p>
                <strong>Email:</strong>{" "}
                <a href="mailto:support@yousicplay.com" className="text-magenta hover:underline">
                  support@yousicplay.com
                </a>
              </p>
              <p className="mt-2">We typically respond within 24-48 hours.</p>
            </div>

            <div>
              <h2 className="mb-5 font-poppins text-2xl font-bold text-navy">
                Frequently Asked Questions
              </h2>

              <div className="space-y-6">
                <h3 className="font-poppins text-lg font-bold text-navy">Account</h3>

                <div>
                  <p className="font-bold text-navy">How do I create an account?</p>
                  <p>
                    You can sign up using your email address (we&apos;ll send a verification code) or
                    use Sign in with Apple for a quick, private sign-in.
                  </p>
                </div>

                <div>
                  <p className="font-bold text-navy">Can I use the app without an account?</p>
                  <p>
                    Yes. You can explore the app as a guest. Your progress is saved locally on your
                    device. Create an account anytime to sync your data across devices.
                  </p>
                </div>

                <div>
                  <p className="font-bold text-navy">How do I delete my account?</p>
                  <p>
                    Email us at{" "}
                    <a href="mailto:support@yousicplay.com" className="text-magenta hover:underline">
                      support@yousicplay.com
                    </a>{" "}
                    and we will delete your account and all associated data within 30 days.
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-6">
                <h3 className="font-poppins text-lg font-bold text-navy">Subscription</h3>

                <div>
                  <p className="font-bold text-navy">What does YousicPlay Pro include?</p>
                  <p>
                    Pro gives you unlimited access to all games, full Lydi AI coaching, unlimited Jam
                    Room time, Y-Score assessments, and MIDI uploads.
                  </p>
                </div>

                <div>
                  <p className="font-bold text-navy">How do I manage my subscription?</p>
                  <p>
                    Go to your iPhone&apos;s Settings &gt; Apple ID &gt; Subscriptions &gt; YousicPlay
                    to manage, upgrade, or cancel your subscription.
                  </p>
                </div>

                <div>
                  <p className="font-bold text-navy">How do I restore my purchase?</p>
                  <p>
                    Open YousicPlay &gt; Settings &gt; Subscription &gt; Restore Purchases. Your
                    subscription is tied to your Apple ID and will be restored automatically.
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-6">
                <h3 className="font-poppins text-lg font-bold text-navy">Spotify Integration</h3>

                <div>
                  <p className="font-bold text-navy">How do I connect Spotify?</p>
                  <p>
                    During onboarding or from Settings, tap &ldquo;Connect Spotify&rdquo; and sign in
                    with your Spotify credentials. This lets you learn songs from your playlists.
                  </p>
                </div>

                <div>
                  <p className="font-bold text-navy">Do I need Spotify Premium?</p>
                  <p>
                    No. YousicPlay works with both free and premium Spotify accounts for song discovery.
                    Audio playback uses our own MIDI engine, not Spotify streaming.
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-6">
                <h3 className="font-poppins text-lg font-bold text-navy">Music and Learning</h3>

                <div>
                  <p className="font-bold text-navy">What instruments does YousicPlay support?</p>
                  <p>
                    Currently, YousicPlay focuses on piano/keyboard skills, music theory, ear training,
                    and rhythm. Additional instruments are planned for future updates.
                  </p>
                </div>

                <div>
                  <p className="font-bold text-navy">What is Y-Score?</p>
                  <p>
                    Y-Score is your personalized music proficiency score based on seven components
                    aligned with music education principles: accuracy, timing, technique, musicality,
                    sight-reading, ear training, and theory knowledge.
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-6">
                <h3 className="font-poppins text-lg font-bold text-navy">Technical Issues</h3>

                <div>
                  <p className="font-bold text-navy">The app is crashing. What should I do?</p>
                  <p>
                    Try closing and reopening the app. If the issue persists, make sure you&apos;re
                    running the latest version from the App Store, then restart your device. If it still
                    happens, email us at{" "}
                    <a href="mailto:support@yousicplay.com" className="text-magenta hover:underline">
                      support@yousicplay.com
                    </a>{" "}
                    with details about what you were doing when it crashed.
                  </p>
                </div>

                <div>
                  <p className="font-bold text-navy">Audio isn&apos;t working.</p>
                  <p>
                    Check that your device is not in Silent Mode (flip the side switch). Make sure no
                    other audio apps are playing in the background. Go to Settings &gt; YousicPlay and
                    verify microphone access is enabled if you&apos;re using Lydi voice features.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-lg border border-navy/10 bg-navy/5 p-6">
              <h2 className="mb-3 font-poppins text-xl font-bold text-navy">App Information</h2>
              <ul className="space-y-1">
                <li><strong>Requires:</strong> iOS 18.0 or later</li>
                <li><strong>Developer:</strong> YousicPlay Inc.</li>
                <li>
                  <strong>Privacy Policy:</strong>{" "}
                  <a href="/privacy-policy" className="text-magenta hover:underline">
                    yousicplay.com/privacy-policy
                  </a>
                </li>
                <li>
                  <strong>Terms of Service:</strong>{" "}
                  <a href="/terms-of-service" className="text-magenta hover:underline">
                    yousicplay.com/terms-of-service
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
