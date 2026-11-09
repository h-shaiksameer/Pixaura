export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Pixaura",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@pixaura.example",
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "Convert, compress, resize, and optimize images online with precise controls.",
  copyrightYear: process.env.NEXT_PUBLIC_COPYRIGHT_YEAR || "2026",
  adsenseClientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "",
  analyticsId: process.env.NEXT_PUBLIC_ANALYTICS_ID || ""
};
