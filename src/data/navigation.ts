import type { NavLink, SocialLink } from "@/types";

export const footerLinks: NavLink[] = [
  { label: "All Classes", href: "/all-classes" },
  { label: "Community", href: "/community" },
  { label: "About", href: "/about" },
  { label: "Privacy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Login", href: "https://courses.yousicplay.com/users/sign_in", external: true },
];

export const socialLinks: SocialLink[] = [
  { platform: "YouTube", href: "https://www.youtube.com/@YousicPlay", icon: "youtube" },
  { platform: "Facebook", href: "https://www.facebook.com/YousicPlay", icon: "facebook" },
  { platform: "Instagram", href: "https://www.instagram.com/yousicplay", icon: "instagram" },
  { platform: "LinkedIn", href: "https://www.linkedin.com/company/yousicplay", icon: "linkedin" },
];
