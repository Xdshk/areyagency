import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const src = path.join(root, "node_modules/pdfjs-dist/build/pdf.worker.min.mjs");
const dest = path.join(root, "public/pdf.worker.min.mjs");

if (fs.existsSync(src)) {
  fs.copyFileSync(src, dest);
  console.log("[copy-pdf-worker] Copied pdf.worker.min.mjs to public/");
} else {
  console.warn("[copy-pdf-worker] Worker not found at", src);
}
