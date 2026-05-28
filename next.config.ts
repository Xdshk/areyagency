import type { NextConfig } from "next";
import fs from "fs";
import path from "path";

// Copy pdfjs worker to public folder on build start
const workerSrc = path.join(
  __dirname,
  "node_modules/pdfjs-dist/build/pdf.worker.min.mjs"
);
const workerDest = path.join(__dirname, "public/pdf.worker.min.mjs");
try {
  if (fs.existsSync(workerSrc)) {
    fs.copyFileSync(workerSrc, workerDest);
  }
} catch {
  // ignore copy errors in dev
}

const nextConfig: NextConfig = {};

export default nextConfig;
