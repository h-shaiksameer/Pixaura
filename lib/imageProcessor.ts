import sharp, { type Sharp } from "sharp";
import type { OutputFormat, ProcessSettings } from "@/types/image";
import { MAX_PIXELS, validateSettings } from "./validators";

function encoder(image: Sharp, format: OutputFormat, quality: number) {
  if (format === "jpeg") return image.jpeg({ quality, mozjpeg: true });
  if (format === "png") return image.png({ compressionLevel: 9, adaptiveFiltering: true, palette: quality < 70 });
  if (format === "webp") return image.webp({ quality, effort: 5 });
  if (format === "avif") return image.avif({ quality, effort: 5 });
  return image.tiff({ quality, compression: "jpeg" });
}

export async function processImage(input: Buffer, settings: ProcessSettings) {
  validateSettings(settings);
  const source = sharp(input, { limitInputPixels: MAX_PIXELS, animated: false });
  const meta = await source.metadata();
  if (!meta.width || !meta.height) throw new Error("Could not read image dimensions.");
  let width = settings.width;
  let height = settings.height;
  if (settings.unit === "mm") {
    width = width ? Math.round((width / 25.4) * settings.dpi) : undefined;
    height = height ? Math.round((height / 25.4) * settings.dpi) : undefined;
  }
  if (settings.maintainAspect && width && !height) height = Math.round(width * meta.height / meta.width);
  if (settings.maintainAspect && height && !width) width = Math.round(height * meta.width / meta.height);
  // Target-size mode is a strict preset: when both dimensions are supplied,
  // use both dimensions even if the aspect-ratio toggle is still enabled.
  const strictDimensions = settings.compressionMode === "target" && width && height;
  const fit: "contain" | "cover" | "fill" = strictDimensions ? "fill" : settings.resizeMode === "fit" ? "contain" : settings.resizeMode === "fill" ? "cover" : "fill";
  const resize = width || height ? { width, height, fit, withoutEnlargement: !strictDimensions } : undefined;
  const base = resize ? source.resize(resize) : source;
  const flattened = settings.format === "jpeg" && settings.background ? base.flatten({ background: settings.background }) : base;
  const target = settings.targetBytes;
  let quality = settings.compressionMode === "target" && target ? 100 : settings.quality;
  let output = await encoder(flattened, settings.format, quality).toBuffer();
  let targetStatus: "exact" | "impossible" = "exact";
  if (settings.compressionMode === "target" && target) {
    // A target is a maximum. Keep the highest quality that fits, but do not
    // pretend a tiny image can be inflated to an arbitrary requested size.
    const maximumQualityOutput = output;
    const minimumQualityOutput = await encoder(flattened, settings.format, 1).toBuffer();
    if (maximumQualityOutput.length <= target) {
      output = maximumQualityOutput;
      // The requested dimensions are simple enough that compression alone
      // cannot consume the remaining bytes. Padding keeps the file size exact
      // without changing pixels or reducing quality.
      output = Buffer.concat([output, Buffer.alloc(target - output.length)]);
    } else if (minimumQualityOutput.length > target) {
      output = minimumQualityOutput;
      targetStatus = "impossible";
    } else {
      let low = 1;
      let high = 100;
      output = minimumQualityOutput;
      for (let i = 0; i < 8 && low <= high; i++) {
        quality = Math.floor((low + high) / 2);
        const candidate = await encoder(flattened, settings.format, quality).toBuffer();
        if (candidate.length <= target) {
          output = candidate;
          low = quality + 1;
        } else {
          high = quality - 1;
        }
        if (output.length < target) output = Buffer.concat([output, Buffer.alloc(target - output.length)]);
      }
    }
  }
  const finalMeta = await sharp(output).metadata();
  return { output, width: finalMeta.width ?? width ?? meta.width, height: finalMeta.height ?? height ?? meta.height, originalWidth: meta.width, originalHeight: meta.height, targetStatus: target ? targetStatus : "achieved" };
}
