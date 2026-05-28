"use client";

import Image from "next/image";
import { useEffect, useCallback, useState, useRef } from "react";

interface ImageModalProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export default function ImageModal({ src, alt, onClose }: ImageModalProps) {
  const [scale, setScale] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragStart = useRef({ x: 0, y: 0 });
  const lastTouchDist = useRef(0);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  // Reset zoom when image changes
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [src]);

  const handleZoomIn = useCallback(() => {
    setScale((s) => Math.min(s + 0.5, 4));
  }, []);

  const handleZoomOut = useCallback(() => {
    setScale((s) => {
      const next = Math.max(s - 0.5, 1);
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  }, []);

  // Drag to pan when zoomed
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (scale <= 1) return;
    setDragging(true);
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  }, [scale, position]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging) return;
    setPosition({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y });
  }, [dragging]);

  const handleMouseUp = useCallback(() => {
    setDragging(false);
  }, []);

  // Pinch zoom on touch
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      lastTouchDist.current = Math.sqrt(dx * dx + dy * dy);
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const delta = dist - lastTouchDist.current;
      lastTouchDist.current = dist;
      setScale((s) => Math.min(Math.max(s + delta * 0.01, 1), 4));
    }
  }, []);

  const doubleTapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleTap = useCallback(() => {
    if (doubleTapTimer.current) {
      clearTimeout(doubleTapTimer.current);
      doubleTapTimer.current = null;
      // Double tap — toggle zoom
      setScale((s) => s > 1 ? 1 : 2);
      setPosition({ x: 0, y: 0 });
    } else {
      doubleTapTimer.current = setTimeout(() => {
        doubleTapTimer.current = null;
      }, 300);
    }
  }, []);

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/95 backdrop-blur-md modal-backdrop"
    >
      {/* Image container */}
      <div
        className="relative w-full h-full flex items-center justify-center p-4 md:p-8 select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onClick={handleTap}
        style={{ cursor: scale > 1 ? (dragging ? 'grabbing' : 'grab') : 'default' }}
      >
        <div
          className="relative w-full h-full transition-transform duration-200 ease-out"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: 'center center',
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain"
            sizes="100vw"
            priority
            draggable={false}
          />
        </div>
      </div>

      {/* Bottom bar — close + zoom controls + mobile hint */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 md:gap-3 bg-black/80 backdrop-blur-sm rounded-full px-3 py-2 md:px-4 md:py-2.5 border border-white/[0.08]">
        {/* Zoom out */}
        <button
          onClick={(e) => { e.stopPropagation(); handleZoomOut(); }}
          disabled={scale <= 1}
          className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/[0.08] disabled:opacity-25 transition-all duration-300 cursor-pointer disabled:cursor-default"
          aria-label="Уменьшить"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
          </svg>
        </button>

        {/* Zoom percent */}
        <span className="text-[10px] md:text-[11px] font-mono text-white/60 tabular-nums min-w-[36px] text-center select-none">
          {Math.round(scale * 100)}%
        </span>

        {/* Zoom in */}
        <button
          onClick={(e) => { e.stopPropagation(); handleZoomIn(); }}
          disabled={scale >= 4}
          className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/[0.08] disabled:opacity-25 transition-all duration-300 cursor-pointer disabled:cursor-default"
          aria-label="Увеличить"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>

        {/* Separator */}
        <div className="w-px h-5 bg-white/[0.08] mx-1" />

        {/* Mobile hint (only on small screens) */}
        <span className="md:hidden text-[9px] text-white/30 uppercase tracking-[0.15em] whitespace-nowrap">
          тап ×2
        </span>

        {/* Separator on desktop */}
        <div className="w-px h-5 bg-white/[0.08] mx-1 hidden md:block" />

        {/* Close */}
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/[0.08] transition-all duration-300 cursor-pointer"
          aria-label="Закрыть"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
