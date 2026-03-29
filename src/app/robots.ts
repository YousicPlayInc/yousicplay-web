import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/", "/learn", "/checkout", "/account", "/login"],
    },
    sitemap: "https://yousicplay.com/sitemap.xml",
  };
}
