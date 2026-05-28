"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Error({ reset }: { reset: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".error-content > *", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={containerRef}
      className="flex min-h-screen items-center justify-center px-6"
    >
      <div className="error-content text-center">
        <h1 className="font-editorial text-5xl md:text-7xl text-white/70 mb-4">
          Ошибка
        </h1>
        <div className="h-px w-12 bg-[#8b6f6f]/30 mx-auto mb-6" />
        <p className="text-[13px] text-white/25 mb-10 tracking-wide">
          Что-то пошло не так
        </p>
        <button
          onClick={reset}
          className="magnetic-btn border border-white/[0.08] px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white/40 hover:text-white/70 hover:border-white/15 transition-all duration-500"
        >
          Попробовать снова
        </button>
      </div>
    </main>
  );
}
