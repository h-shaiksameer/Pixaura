import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: "Convert, compress, resize, and optimize images online with precise controls.",
  keywords: ["image compressor", "image converter", "resize image", "compress JPG", "compress PNG"],
  openGraph: { title: siteConfig.name, description: "Image tools with precise results and a smooth workflow.", type: "website" },
  icons: { icon: "/pixaura-icon.svg", shortcut: "/pixaura-icon.svg", apple: "/pixaura-icon.svg" }
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
