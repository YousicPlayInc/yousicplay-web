import Image from "next/image";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";

const partners = [
  { name: "Sweetwater", logo: "/images/partners/partner-logo-01.svg" },
  { name: "Berklee", logo: "/images/partners/partner-logo-02.svg" },
  { name: "Grammy", logo: "/images/partners/partner-logo-03.svg" },
  { name: "Universal", logo: "/images/partners/partner-logo-04.svg" },
  { name: "Billboard", logo: "/images/partners/partner-logo-05.svg" },
];

export default function PartnerLogoBar() {
  return (
    <section className="bg-cream py-16">
      <MaxWidthWrapper>
        <h2 className="mb-8 text-center font-poppins text-2xl font-bold uppercase tracking-tight text-navy sm:text-3xl">
          Partners &amp; Affiliates
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex h-12 items-center opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={48}
                className="h-12 w-auto"
              />
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
