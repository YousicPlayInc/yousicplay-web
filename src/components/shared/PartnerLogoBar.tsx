import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";

const partners = [
  { name: "Sweetwater", logo: "/images/partners/sweetwater.svg" },
  { name: "Berklee", logo: "/images/partners/berklee.svg" },
  { name: "Grammy", logo: "/images/partners/grammy.svg" },
  { name: "Universal", logo: "/images/partners/universal.svg" },
  { name: "Billboard", logo: "/images/partners/billboard.svg" },
];

export default function PartnerLogoBar() {
  return (
    <section className="bg-cream py-12">
      <MaxWidthWrapper>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex h-12 items-center opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0"
            >
              {/* Placeholder text until real logos are available */}
              <span className="font-poppins text-lg font-bold uppercase tracking-wider text-navy/50">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
