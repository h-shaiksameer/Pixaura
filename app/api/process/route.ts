import { NextResponse } from "next/server";
import { processImage } from "@/lib/imageProcessor";
import { validateUpload } from "@/lib/validators";
import type { ProcessSettings } from "@/types/image";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const file = form.get("file");
    const raw = form.get("settings");
    if (!(file instanceof File) || typeof raw !== "string") return NextResponse.json({ error: "File and settings are required." }, { status: 400 });
    validateUpload(file);
    const settings = JSON.parse(raw) as ProcessSettings;
    const result = await processImage(Buffer.from(await file.arrayBuffer()), settings);
    const ext = settings.format === "jpeg" ? "jpg" : settings.format;
    return new NextResponse(result.output as BodyInit, {
      headers: { "Content-Type": `image/${settings.format}`, "Content-Disposition": `attachment; filename="${file.name.replace(/\.[^.]+$/, "")}-pixelforge.${ext}"`, "X-Output-Bytes": String(result.output.length), "X-Width": String(result.width), "X-Height": String(result.height), "X-Target-Status": result.targetStatus, "Cache-Control": "no-store" }
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Image processing failed." }, { status: 400 });
  }
}
