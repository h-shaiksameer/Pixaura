import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/siteConfig";

export function GET() {
  const clientId = siteConfig.adsenseClientId;
  const body = clientId ? `google.com, ${clientId}, DIRECT, f08c47fec0942fa0\n` : "";
  return new NextResponse(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
