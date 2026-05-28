"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface PdfThumbProps {
  src: string;
  className?: string;
}

export default function PdfThumb({ src, className = "" }: PdfThumbProps) {
  const [thumbSrc, setThumbSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const attemptRef = useRef(0);

  // Only start rendering when the card scrolls into view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // start loading slightly before it's visible
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const renderPdf = useCallback(async () => {
    const pdfjs = await import("pdfjs-dist");

    const workerResponse = await fetch("/pdf.worker.min.mjs");
    if (!workerResponse.ok) throw new Error("Worker fetch failed");
    const workerCode = await workerResponse.text();
    const workerBlob = new Blob([workerCode], { type: "application/javascript" });
    const workerObjectUrl = URL.createObjectURL(workerBlob);
    pdfjs.GlobalWorkerOptions.workerSrc = workerObjectUrl;

    try {
      const loadingTask = pdfjs.getDocument({
        url: src,
        isEvalSupported: false,
        disableAutoFetch: false,
      } as Parameters<typeof pdfjs.getDocument>[0]);
      const doc = await loadingTask.promise;

      const page = await doc.getPage(1);

      const baseScale = 2.0;
      const viewport = page.getViewport({ scale: baseScale });

      const canvas = document.createElement("canvas");
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = viewport.width * dpr;
      canvas.height = viewport.height * dpr;

      const ctx = canvas.getContext("2d")!;
      ctx.scale(dpr, dpr);

      await page.render({
        canvasContext: ctx,
        canvas,
        viewport,
      }).promise;

      const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
      setThumbSrc(dataUrl);
      setLoading(false);
      doc.destroy();
    } finally {
      URL.revokeObjectURL(workerObjectUrl);
    }
  }, [src]);

  useEffect(() => {
    if (!visible) return;

    let cancelled = false;
    attemptRef.current = 0;

    async function run() {
      const maxRetries = 2;
      for (let i = 0; i <= maxRetries; i++) {
        if (cancelled) return;
        attemptRef.current = i;
        try {
          await renderPdf();
          return;
        } catch (err) {
          console.warn(`[PdfThumb] attempt ${i + 1} failed:`, err);
          if (i === maxRetries) {
            if (!cancelled) {
              setError(true);
              setLoading(false);
            }
          } else {
            await new Promise(r => setTimeout(r, 500 * (i + 1)));
          }
        }
      }
    }

    run();
    return () => { cancelled = true; };
  }, [visible, renderPdf]);

  return (
    <div ref={containerRef} className={className}>
      {loading && (
        <div className="skeleton-shimmer absolute inset-0 w-full h-full" />
      )}

      {error && (
        <div className="flex flex-col items-center justify-center gap-2 bg-white/[0.02] absolute inset-0 w-full h-full">
          <svg className="h-8 w-8 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
          </svg>
          <span className="text-[10px] text-white/15 uppercase tracking-wider">PDF</span>
        </div>
      )}

      {thumbSrc && (
        <img src={thumbSrc} alt="" className="object-cover absolute inset-0 w-full h-full" draggable={false} />
      )}
    </div>
  );
}
