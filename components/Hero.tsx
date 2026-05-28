"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.from(".hero-eyebrow", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          ".hero-line",
          {
            y: 120,
            opacity: 0,
            rotationX: -25,
            duration: 1.6,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          ".hero-cta-wrap > *",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(
          ".hero-scroll",
          {
            opacity: 0,
            duration: 1.2,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .from(".hero-side", {
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        }, "-=0.8");

      // Background parallax — skip on mobile to save perf
      const isMobile = window.matchMedia("(hover: none)").matches;
      if (!isMobile) {
        gsap.to(bgRef.current, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Scroll-triggered watermark reveal + heading fade — mobile: simpler
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: isMobile ? "50% top" : "80% top",
          scrub: isMobile ? 0.5 : 1,
        },
      });

      // Fade and shift main content up/scatter
      scrollTl
        .to(
          ".hero-line",
          {
            x: isMobile ? 0 : (i) => (i % 2 === 0 ? -60 : 60),
            rotationY: isMobile ? 0 : (i) => (i % 2 === 0 ? -8 : 8),
            opacity: 0,
            stagger: isMobile ? 0.05 : 0.08,
            xPercent: 0,
            ease: "power2.out",
          },
          0
        )
        .to(
          ".hero-eyebrow",
          { opacity: 0, y: -20, ease: "power2.out" },
          0
        )
        .to(
          ".hero-cta-wrap",
          { opacity: 0, y: -20, ease: "power2.out" },
          0.15
        )
        .to(
          watermarkRef.current,
          { opacity: 1, scale: 1, y: 0, ease: "power3.out" },
          0.1
        );

      // Counter animation
      gsap.from(".hero-counter", {
        opacity: 0,
        duration: 0.8,
        delay: 1.5,
        ease: "power2.out",
      });

      // Subtle floating on the ambient orbs
      gsap.to(".orb-1", {
        x: 30,
        y: -20,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".orb-2", {
        x: -25,
        y: 15,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 md:px-10"
    >
      {/* Atmospheric background */}
      <div ref={bgRef} className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_45%,rgba(139,111,111,0.06),transparent_70%)]" />

        {/* Breathing orbs */}
        <div className="orb-1 absolute top-[20%] left-[40%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(139,111,111,0.04),transparent_60%)] blur-3xl" />
        <div className="orb-2 absolute top-[50%] left-[30%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(139,111,111,0.03),transparent_60%)] blur-3xl" />

        {/* Cinematic spotlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.012),transparent_50%)]" />
      </div>

      {/* Grid lines decoration */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute left-[20%] top-0 bottom-0 w-px bg-white" />
        <div className="absolute left-[80%] top-0 bottom-0 w-px bg-white" />
        <div className="absolute top-[30%] left-0 right-0 h-px bg-white" />
        <div className="absolute top-[70%] left-0 right-0 h-px bg-white" />
      </div>

      {/* Brand watermark — revealed on scroll */}
      <div
        ref={watermarkRef}
        className="watermark pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 scale-95 will-change-transform"
      >
        <span
          className="font-editorial font-semibold text-[clamp(8rem,20vw,22rem)] text-white/[0.025] leading-none select-none tracking-[-0.04em]"
          aria-hidden="true"
        >
          AREY
        </span>
      </div>

      <div className="hero-content relative z-10 mx-auto w-full max-w-[1300px]">
        {/* Eyebrow */}
        <div className="hero-eyebrow mb-8 md:mb-12">
          <span className="section-label font-editorial text-[10px] md:text-[11px]">
            Креативное агентство
          </span>
        </div>

        {/* Main heading — editorial oversized */}
        <h1
          ref={linesRef}
          className="hero-lines font-editorial font-semibold leading-[0.88] tracking-[-0.04em] text-white"
          style={{ perspective: "800px" }}
        >
          <div className="hero-line overflow-hidden">
            <span className="block text-[clamp(3.5rem,11vw,10rem)]">Дизайн,</span>
          </div>
          <div className="hero-line overflow-hidden">
            <span className="block text-[clamp(3.5rem,11vw,10rem)] text-[#b09090]">
              который
            </span>
          </div>
          <div className="hero-line overflow-hidden">
            <span className="block text-[clamp(3.5rem,11vw,10rem)]">
              невозможно
            </span>
          </div>
          <div className="hero-line overflow-hidden">
            <span className="block text-[clamp(3.5rem,11vw,10rem)]">
              игнорировать
            </span>
          </div>
        </h1>

        {/* CTAs — centered under heading */}
        <div className="hero-cta-wrap mt-10 md:mt-14 flex flex-wrap justify-center items-center gap-4 md:gap-6">
          <a
            href="/works"
            data-cursor="hover"
            className="group inline-flex items-center gap-3 px-14 py-5 md:px-16 md:py-6 text-[14px] md:text-[15px] uppercase tracking-[0.15em] border-2 border-[#8b6f6f]/80 bg-[#8b6f6f]/25 text-white font-medium hover:bg-[#8b6f6f]/40 hover:border-[#8b6f6f] hover:shadow-[0_0_40px_rgba(139,111,111,0.2)] transition-all duration-500 magnetic-btn rounded-sm"
          >
            Работы
            <svg className="w-4 h-4 md:w-5 md:h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </a>
          <a
            href="/contact"
            data-cursor="hover"
            className="group inline-flex items-center px-14 py-5 md:px-16 md:py-6 text-[14px] md:text-[15px] uppercase tracking-[0.15em] border-2 border-white/30 text-white font-medium hover:text-white hover:border-white/60 hover:bg-white/[0.06] hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all duration-500 magnetic-btn rounded-sm"
          >
            Связаться
          </a>
        </div>
      </div>

      {/* Scroll indicator — enhanced with rotating ring */}
      <div className="hero-scroll absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <div className="relative flex items-center justify-center w-8 h-8">
          {/* Rotating ring SVG */}
          <svg className="absolute w-8 h-8 animate-[spin_8s_linear_infinite] opacity-30" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" stroke="rgba(139,111,111,0.3)" strokeWidth="0.5" strokeDasharray="8 20" />
          </svg>
          <span className="text-[9px] uppercase tracking-[0.3em] text-white/15">
            Scroll
          </span>
        </div>
        <div className="relative h-12 w-px overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent animate-[scrollLine_2s_ease-in-out_infinite]" />
        </div>
      </div>

      {/* Side counter + marquee */}
      <div className="hero-side absolute right-6 md:right-10 bottom-8 md:bottom-12 flex flex-col items-end gap-4">
        <span className="hero-counter counter text-[10px] font-mono text-white/10">01 / 04</span>
      </div>

      {/* Left side vertical label */}
      <div className="hero-side absolute left-6 md:left-10 bottom-8 md:bottom-12">
        <span className="vertical-label hidden md:block text-[9px] uppercase tracking-[0.3em] text-white/10 [writing-mode:vertical-rl] rotate-180 origin-left translate-x-4 opacity-60">
          Arey Agency — Creative Direction
        </span>
      </div>

      <style jsx>{`
        @keyframes scrollLine {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          30% {
            opacity: 1;
          }
          100% {
            transform: translateY(100%);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
