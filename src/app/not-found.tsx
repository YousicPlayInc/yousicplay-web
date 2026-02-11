import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center bg-navy">
      <MaxWidthWrapper className="text-center">
        <p className="font-poppins text-8xl font-bold text-lime sm:text-9xl">404</p>
        <h1 className="mt-4 font-poppins text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">
          Page Not Found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm text-white/60">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you
          back to making music.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button href="/" variant="lime">
            Go Home
          </Button>
          <Button href="/all-classes" variant="outline">
            Browse Classes
          </Button>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
