import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EmailCaptureModal from "@/components/shared/EmailCaptureModal";
import UnlockSuccessButton from "@/components/shared/UnlockSuccessButton";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins-var",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair-var",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "YousicPlay — Learn Music From the World's Best Musicians",
    template: "%s | YousicPlay",
  },
  description:
    "Get exclusive access to music lessons from celebrity musicians and world-class instructors. Learn piano, guitar, violin, drums, singing and more.",
  icons: {
    icon: "/images/favicon.webp",
    apple: "/images/favicon.webp",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yousicplay.com",
    siteName: "YousicPlay",
    images: [
      {
        url: "/images/homepage/banner-video4.webp",
        width: 1200,
        height: 630,
        alt: "YousicPlay — Learn Music From the World's Best Musicians",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${playfair.variable} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <EmailCaptureModal />
        <UnlockSuccessButton />
      </body>
    </html>
  );
}
