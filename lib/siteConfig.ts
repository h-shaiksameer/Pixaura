function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

export const siteConfig = {
  name: requiredEnv("NEXT_PUBLIC_SITE_NAME"),
  url: requiredEnv("NEXT_PUBLIC_SITE_URL"),
  contactEmail: requiredEnv("NEXT_PUBLIC_CONTACT_EMAIL"),
  description: requiredEnv("NEXT_PUBLIC_SITE_DESCRIPTION"),
  copyrightYear: requiredEnv("NEXT_PUBLIC_COPYRIGHT_YEAR"),
  adsenseClientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "",
  analyticsId: process.env.NEXT_PUBLIC_ANALYTICS_ID || ""
};
