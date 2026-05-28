"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type CursorState = "default" | "hover" | "project" | "text";

/**
 * Premium cinematic cursor system.
 * — Dot (8px) + outer ring (36px) with lerp smoothing
 * — State-driven appearance changes
 * — GSAP-powered motion for buttery interpolation
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(true);

  // Detect touch device after mount — skip cursor entirely on touch
  useEffect(() => {
    const mq = window.matchMedia("(hover: none) and (pointer: coarse)");
    setIsTouch(mq.matches);

    const handler = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (isTouch) return null;

  return <CursorInner dotRef={dotRef} ringRef={ringRef} />;
}

function CursorInner({
  dotRef,
  ringRef,
}: {
  dotRef: React.RefObject<HTMLDivElement | null>;
  ringRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [state, setState] = useState<CursorState>("default");
  const [isVisible, setIsVisible] = useState(false);

  // Lerp animation state (stored in refs for performance)
  const mouseRef = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
    if (!isVisible) setIsVisible(true);
  }, [isVisible]);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  // State detection via data attributes
  useEffect(() => {
    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorEl = target.closest("[data-cursor]");

      if (cursorEl) {
        const cursorType = cursorEl.getAttribute("data-cursor");
        if (cursorType === "project") setState("project");
        else if (cursorType === "text") setState("text");
        else setState("hover");
      } else {
        setState("default");
      }
    };

    const handleOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorEl = target.closest("[data-cursor]");
      if (!cursorEl) setState("default");
    };

    document.addEventListener("mouseover", handleOver, { passive: true });
    document.addEventListener("mouseout", handleOut, { passive: true });

    return () => {
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, []);

  // Main animation loop
  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const animate = () => {
      dotPos.current.x = lerp(dotPos.current.x, mouseRef.current.x, 0.9);
      dotPos.current.y = lerp(dotPos.current.y, mouseRef.current.y, 0.9);

      ringPos.current.x = lerp(ringPos.current.x, mouseRef.current.x, 0.15);
      ringPos.current.y = lerp(ringPos.current.y, mouseRef.current.y, 0.15);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotPos.current.x}px, ${dotPos.current.y}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafRef.current);
  }, [dotRef, ringRef]);

  // Visibility tracking
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [handleMouseMove, handleMouseLeave, handleMouseEnter]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      {/* Dot */}
      <div
        ref={dotRef}
        className={`cursor-dot ${isVisible ? "opacity-100" : "opacity-0"} ${state}`}
      />

      {/* Ring */}
      <div
        ref={ringRef}
        className={`cursor-ring ${isVisible ? "opacity-100" : "opacity-0"} ${state}`}
      />
    </div>
  );
}
