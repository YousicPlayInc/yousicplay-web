import type { Metadata } from "next";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Join the YousicPlay community. Connect with fellow musicians, share your progress, and stay up to date with the latest courses and content.",
};

const socialChannels = [
  {
    name: "YouTube",
    description: "Watch free lessons, behind-the-scenes content, and student spotlights.",
    href: "https://www.youtube.com/@YousicPlay",
    cta: "Subscribe",
  },
  {
    name: "Facebook",
    description: "Join our Facebook group to connect with other students and share your journey.",
    href: "https://www.facebook.com/YousicPlay",
    cta: "Follow Us",
  },
  {
    name: "Instagram",
    description: "Daily inspiration, practice tips, and student features.",
    href: "https://www.instagram.com/yousicplay",
    cta: "Follow Us",
  },
  {
    name: "LinkedIn",
    description: "Stay connected with our team and industry updates.",
    href: "https://www.linkedin.com/company/yousicplay",
    cta: "Connect",
  },
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-navy">
      {/* Hero */}
      <section className="bg-gradient-to-b from-navy to-navy-dark py-20">
        <MaxWidthWrapper className="text-center">
          <h1 className="font-poppins text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl">
            Join Our Community
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-serif text-lg text-white/70">
            Connect with thousands of musicians from around the world. Share your progress, get
            inspired, and grow together.
          </p>
          <div className="mt-8">
            <Button href="/all-classes" variant="lime" className="px-10 py-4">
              Start Learning Today
            </Button>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Social Channels */}
      <section className="py-20">
        <MaxWidthWrapper>
          <h2 className="mb-12 text-center font-poppins text-3xl font-bold uppercase tracking-tight text-white">
            Connect With Us
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {socialChannels.map((channel) => (
              <a
                key={channel.name}
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl bg-navy-light p-8 transition-colors hover:bg-navy-light/80"
              >
                <h3 className="font-poppins text-lg font-bold text-lime">{channel.name}</h3>
                <p className="mt-2 text-sm text-white/60">{channel.description}</p>
                <span className="mt-4 inline-block font-poppins text-sm font-semibold uppercase tracking-wide text-magenta group-hover:underline">
                  {channel.cta} &rarr;
                </span>
              </a>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Latest Drops */}
      <section className="bg-navy-light py-20">
        <MaxWidthWrapper className="text-center">
          <h2 className="font-poppins text-3xl font-bold uppercase tracking-tight text-white">
            Latest Drops
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/60">
            New courses and content are added regularly. Be the first to know when new classes drop
            by following us on social media.
          </p>
          <div className="mt-8">
            <Button href="/all-classes" variant="outline">
              Browse All Classes
            </Button>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Discord CTA */}
      <section className="bg-magenta/10 py-20">
        <MaxWidthWrapper className="text-center">
          <h2 className="font-poppins text-3xl font-bold uppercase tracking-tight text-white">
            Join Our Discord
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-serif text-base text-white/70">
            Get real-time support, share your music, and connect with instructors and fellow
            students in our Discord community.
          </p>
          <div className="mt-8">
            <Button variant="magenta" className="px-10 py-4">
              Coming Soon
            </Button>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
