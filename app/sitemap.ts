import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";
export default function sitemap(): MetadataRoute.Sitemap { return ["/", "/about", "/privacy", "/terms", "/cookies", "/contact"].map(path => ({ url: `${siteConfig.url}${path}`, lastModified: new Date() })); }
