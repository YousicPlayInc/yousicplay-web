import Image from "next/image";
import Link from "next/link";
import Tag from "@/components/ui/Tag";

interface CourseCardProps {
  slug: string;
  imagePath: string;
  cardTitle: string;
  instructorName: string;
  instrument: string;
  level: string;
}

export default function CourseCard({
  slug,
  imagePath,
  cardTitle,
  instructorName,
  instrument,
  level,
}: CourseCardProps) {
  return (
    <Link
      href={`/classes/${slug}`}
      className="group block overflow-hidden rounded-2xl bg-navy-light transition-transform hover:scale-[1.02]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={imagePath}
          alt={`${instructorName} - ${cardTitle}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
      <div className="p-5">
        <h3 className="font-poppins text-sm font-bold uppercase tracking-wide text-white">
          {cardTitle}
        </h3>
        <p className="mt-1 text-sm text-white/60">{instructorName}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Tag>{level}</Tag>
          <Tag>{instrument}</Tag>
        </div>
      </div>
    </Link>
  );
}
