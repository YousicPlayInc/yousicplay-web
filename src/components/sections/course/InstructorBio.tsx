import Image from "next/image";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";

interface InstructorBioProps {
  name: string;
  bio: string;
  photo: string;
  quote?: string;
}

export default function InstructorBio({ name, bio, photo, quote }: InstructorBioProps) {
  return (
    <section className="bg-navy py-20">
      <MaxWidthWrapper>
        <h2 className="mb-14 text-center font-poppins text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
          Your Instructor
        </h2>
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start">
          {/* Photo placeholder */}
          <div className="relative h-56 w-56 shrink-0 overflow-hidden rounded-full bg-navy-light">
            <Image src={photo} alt={name} fill className="object-cover" sizes="224px" />
          </div>

          <div className="flex-1">
            <h3 className="font-poppins text-2xl font-bold text-lime">{name}</h3>
            <p className="mt-4 font-serif text-base leading-relaxed text-white/70">{bio}</p>

            {quote && (
              <div className="mt-8 rounded-xl bg-navy-light p-6">
                <svg className="mb-3 h-8 w-8 text-lime/40" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
                </svg>
                <p className="font-serif text-lg italic leading-relaxed text-white/80">
                  &ldquo;{quote}&rdquo;
                </p>
              </div>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
