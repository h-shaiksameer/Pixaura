import type { ProcessSettings } from "@/types/image";

export const MAX_FILE_BYTES = 10 * 1024 * 1024;
export const MAX_PIXELS = 40_000_000;
const formats = new Set(["image/jpeg", "image/png", "image/webp", "image/avif", "image/tiff", "image/gif", "image/bmp"]);

export function validateUpload(file: File) {
  if (!formats.has(file.type)) throw new Error("Unsupported image type. Use JPG, PNG, WEBP, AVIF, TIFF, GIF, or BMP.");
  if (file.size > MAX_FILE_BYTES) throw new Error("Image is larger than the 10 MB limit.");
}

export function validateSettings(settings: ProcessSettings) {
  if (!["jpeg", "png", "webp", "avif", "tiff"].includes(settings.format)) throw new Error("Unsupported output format.");
  if (settings.quality < 1 || settings.quality > 100) throw new Error("Quality must be between 1 and 100.");
  if (settings.targetBytes && (settings.targetBytes < 1024 || settings.targetBytes > 50 * 1024 * 1024)) throw new Error("Target size must be between 1 KB and 50 MB.");
  for (const value of [settings.width, settings.height]) if (value !== undefined && (!Number.isInteger(value) || value < 1 || value > 10000)) throw new Error("Dimensions must be whole numbers between 1 and 10,000.");
}
