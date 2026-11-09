export type OutputFormat = "jpeg" | "png" | "webp" | "avif" | "tiff";
export type ResizeMode = "fit" | "fill" | "stretch";
export type CompressionMode = "quality" | "target";
export interface ProcessSettings {
  format: OutputFormat;
  compressionMode: CompressionMode;
  quality: number;
  targetBytes?: number;
  width?: number;
  height?: number;
  unit: "px" | "mm";
  dpi: number;
  maintainAspect: boolean;
  resizeMode: ResizeMode;
  background: string;
}
