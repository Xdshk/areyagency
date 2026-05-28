"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist";

interface PdfModalProps {
  src: string;
  title: string;
  onClose: () => void;
}

export default function PdfModal({ src, title, onClose }: PdfModalProps) {
  const [doc, setDoc] = useState<PDFDocumentProxy | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [page, setPage] = useState(1);
  const [scale, setScale] = useState(1);
  const [ready, setReady] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [rendering, setRendering] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let workerObjectUrl: string | null = null;

    async function load() {
      try {
        const pdfjs = await import("pdfjs-dist");

        const workerResponse = await fetch("/pdf.worker.min.mjs");
        if (!workerResponse.ok) throw new Error("Worker fetch failed");
        const workerCode = await workerResponse.text();
        const workerBlob = new Blob([workerCode], { type: "application/javascript" });
        workerObjectUrl = URL.createObjectURL(workerBlob);
        pdfjs.GlobalWorkerOptions.workerSrc = workerObjectUrl;

        const pdf = await pdfjs.getDocument({ url: src }).promise;
        if (cancelled) { pdf.destroy(); return; }

        setDoc(pdf);
        setNumPages(pdf.numPages);
        setReady(true);
      } catch (err) {
        console.error("[PdfModal]", err);
        setLoadError(true);
      } finally {
        if (workerObjectUrl) URL.revokeObjectURL(workerObjectUrl);
      }
    }

    load();
    return () => { cancelled = true; doc?.destroy(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  useEffect(() => {
    if (!doc || !canvasRef.current) return;
    let cancelled = false;
    setRendering(true);

    (async () => {
      try {
        const pdfPage: PDFPageProxy = await doc.getPage(page);
        if (cancelled) return;
        const viewport = pdfPage.getViewport({ scale });
        const canvas = canvasRef.current!;
        const dpr = window.devicePixelRatio || 1;
        canvas.width = viewport.width * dpr;
        canvas.height = viewport.height * dpr;
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;
        const ctx = canvas.getContext("2d")!;
        ctx.scale(dpr, dpr);
        await pdfPage.render({ canvasContext: ctx, canvas, viewport }).promise;
      } catch (err) {
        console.error("[PdfModal] render", err);
      } finally {
        if (!cancelled) setRendering(false);
      }
    })();

    return () => { cancelled = true; };
  }, [doc, page, scale]);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft" && page > 1) setPage((p) => p - 1);
    if (e.key === "ArrowRight" && page < numPages) setPage((p) => p + 1);
    if (e.key === "+" || e.key === "=") setScale((s) => Math.min(3, s + 0.25));
    if (e.key === "-") setScale((s) => Math.max(0.5, s - 0.25));
  }, [onClose, page, numPages]);

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  return (
    <div
      ref={backdropRef}
      onClick={(e) => { if (e.target === backdropRef.current) onClose(); }}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 backdrop-blur-md modal-backdrop"
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-2 md:top-3 md:right-3 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/60 border border-white/20 text-white/70 hover:text-white hover:border-white/50 hover:bg-black/80 transition-all duration-300 cursor-pointer"
        aria-label="Закрыть"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="absolute top-6 left-8 right-20 z-10">
        <p className="font-editorial text-lg md:text-xl text-white/90 truncate">{title}</p>
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mt-1">Презентация</p>
      </div>

      <div className="relative w-full max-w-5xl h-[85vh] flex flex-col items-center justify-center px-4">
        {!ready && !loadError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className="modal-spinner" />
            <span className="text-[11px] uppercase tracking-[0.3em] text-white/30">Загрузка презентации...</span>
          </div>
        )}

        {loadError && (
          <div className="flex flex-col items-center justify-center gap-3 text-white/40">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126Z" />
            </svg>
            <span className="text-[13px]">Не удалось загрузить PDF</span>
            <a href={src} target="_blank" rel="noopener" className="text-[11px] text-white/30 hover:text-white/60 underline underline-offset-4 transition-colors">
              Открыть в новой вкладке →
            </a>
          </div>
        )}

        {ready && (
          <>
            <div className="relative overflow-auto w-full h-full flex items-start justify-center pt-4 pb-16">
              <canvas
                ref={canvasRef}
                className="shadow-2xl max-w-full h-auto"
                style={{ opacity: rendering ? 0.3 : 1, transition: "opacity 0.2s" }}
              />
              {rendering && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="modal-spinner modal-spinner-sm" />
                </div>
              )}
            </div>

            {numPages > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/70 backdrop-blur-sm rounded-full px-4 py-2 border border-white/[0.06]">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1}
                  className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white disabled:opacity-20 transition-colors cursor-pointer disabled:cursor-default">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                  </svg>
                </button>
                <span className="text-[11px] font-mono text-white/60 tabular-nums min-w-[60px] text-center select-none">
                  {page} / {numPages}
                </span>
                <button onClick={() => setPage((p) => Math.min(numPages, p + 1))} disabled={page >= numPages}
                  className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white disabled:opacity-20 transition-colors cursor-pointer disabled:cursor-default">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
                <div className="w-px h-4 bg-white/10 mx-1" />
                <button onClick={() => setScale((s) => Math.max(0.5, s - 0.25))}
                  className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white transition-colors cursor-pointer">−</button>
                <span className="text-[10px] font-mono text-white/40 min-w-[36px] text-center select-none">{Math.round(scale * 100)}%</span>
                <button onClick={() => setScale((s) => Math.min(3, s + 0.25))}
                  className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white transition-colors cursor-pointer">+</button>
                <div className="w-px h-4 bg-white/10 mx-1" />
                <button onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white transition-colors cursor-pointer">✕</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
