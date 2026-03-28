import { ImageResponse } from "next/og";
import { courses } from "@/data/courses";

export const runtime = "edge";

export const alt = "YousicPlay Certificate of Completion";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage(props: {
  params: Promise<{ courseSlug: string }>;
}) {
  const { courseSlug } = await props.params;
  const course = courses.find((c) => c.slug === courseSlug);

  const courseTitle = course?.title ?? "Music Course";
  const instructorName = course?.instructor?.name ?? "Expert Instructor";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#202536",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Border accent */}
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            right: 20,
            bottom: 20,
            border: "2px solid rgba(204, 255, 0, 0.2)",
            borderRadius: 16,
            display: "flex",
          }}
        />

        {/* Corner accents */}
        <div
          style={{
            position: "absolute",
            top: 30,
            left: 30,
            width: 40,
            height: 40,
            borderLeft: "3px solid #CCFF00",
            borderTop: "3px solid #CCFF00",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 30,
            right: 30,
            width: 40,
            height: 40,
            borderRight: "3px solid #CCFF00",
            borderTop: "3px solid #CCFF00",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 30,
            left: 30,
            width: 40,
            height: 40,
            borderLeft: "3px solid #CCFF00",
            borderBottom: "3px solid #CCFF00",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 30,
            right: 30,
            width: 40,
            height: 40,
            borderRight: "3px solid #CCFF00",
            borderBottom: "3px solid #CCFF00",
            display: "flex",
          }}
        />

        {/* YousicPlay branding */}
        <div
          style={{
            color: "#CCFF00",
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            marginBottom: 24,
            display: "flex",
          }}
        >
          YOUSICPLAY
        </div>

        {/* Certificate title */}
        <div
          style={{
            color: "#FFFFFF",
            fontSize: 48,
            fontWeight: 700,
            marginBottom: 16,
            display: "flex",
          }}
        >
          Certificate of Completion
        </div>

        {/* Divider */}
        <div
          style={{
            width: 80,
            height: 2,
            backgroundColor: "rgba(204, 255, 0, 0.4)",
            marginBottom: 32,
            display: "flex",
          }}
        />

        {/* Course title */}
        <div
          style={{
            color: "#FFFFFF",
            fontSize: 28,
            fontWeight: 600,
            textAlign: "center",
            maxWidth: 900,
            marginBottom: 16,
            display: "flex",
          }}
        >
          {courseTitle}
        </div>

        {/* Instructor */}
        <div
          style={{
            color: "rgba(255, 255, 255, 0.6)",
            fontSize: 20,
            marginBottom: 8,
            display: "flex",
          }}
        >
          Taught by {instructorName}
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
