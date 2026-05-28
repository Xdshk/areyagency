"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    num: "01",
    title: "Быстро",
    desc: "Первые концепты за 48 часов. Не ждём вдохновения — создаём его.",
  },
  {
    num: "02",
    title: "Точно",
    desc: "Дизайн ради внимания, не декора. Каждый элемент работает на результат.",
  },
  {
    num: "03",
    title: "Гибко",
    desc: "От афиш до полной бренд-системы. Масштабируемся под задачу.",
  },
  {
    num: "04",
    title: "Надёжно",
    desc: "Дедлайны — часть процесса. Собираем вовремя, сдаём чисто.",
  },
];

const steps = [
  {
    num: "01",
    title: "Бриф",
    text: "Цель, аудитория, форматы, сроки. Детали решают всё.",
  },
  {
    num: "02",
    title: "Концепт",
    text: "Визуальное направление и варианты. Показываем, обсуждаем, выбираем.",
  },
  {
    num: "03",
    title: "Доработка",
    text: "Точные правки до идеала. Полируем каждую деталь.",
  },
  {
    num: "04",
    title: "Передача",
    text: "Финальные файлы digital и печати. Готово к запуску.",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section headers
      gsap.from(".about-eyebrow", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-eyebrow",
          start: "top 85%",
        },
      });

      gsap.from(".about-title-line", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-title-line",
          start: "top 85%",
        },
      });

      // Watermark scale-in
      gsap.fromTo(
        ".about-watermark",
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-watermark",
            start: "top 80%",
          },
        }
      );

      // Values
      gsap.from(".value-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".values-grid",
          start: "top 80%",
        },
      });

      // Process header
      gsap.from(".process-eyebrow", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".process-eyebrow",
          start: "top 85%",
        },
      });

      gsap.from(".process-title-line", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".process-title-line",
          start: "top 85%",
        },
      });

      // Steps
      gsap.from(".step-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".steps-grid",
          start: "top 80%",
        },
      });

      // Accent lines animation
      gsap.from(".accent-line", {
        scaleX: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".values-grid",
          start: "top 75%",
        },
      });

      // Kinetic typography marquees
      gsap.from(".marquee-line", {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".marquee-line",
          start: "top 88%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative px-6 py-24 md:py-40 md:px-10">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
      </div>

      <div className="mx-auto max-w-[1400px]">
        {/* About intro */}
        <div className="mb-16 md:mb-28 relative">
          <div className="about-eyebrow mb-6">
            <span className="section-label">О нас</span>
          </div>
          <h2
            className="font-editorial font-semibold leading-[0.9] tracking-[-0.03em] text-white"
            style={{ perspective: "600px" }}
          >
            <div className="about-title-line overflow-hidden">
              <span className="block text-[clamp(2.5rem,7vw,6rem)]">Почему</span>
            </div>
            <div className="about-title-line overflow-hidden">
              <span className="block text-[clamp(2.5rem,7vw,6rem)] text-[#b09090]">
                выбирают нас
              </span>
            </div>
          </h2>
          <div className="mt-6 md:mt-8 h-px w-16 bg-gradient-to-r from-[#8b6f6f]/60 to-transparent" />

          {/* Brand watermark */}
          <div
            className="about-watermark pointer-events-none absolute -right-10 top-10 -z-10 select-none opacity-0"
            aria-hidden="true"
          >
            <span className="font-editorial font-semibold text-[clamp(5rem,14vw,12rem)] text-white/[0.02] leading-none tracking-[-0.04em]">
              AREY
            </span>
          </div>
        </div>

        {/* Kinetic typographic separator */}
        <div className="relative py-16 md:py-24 overflow-hidden">
          <div className="flex flex-col items-center gap-2">
            <span className="marquee-line font-editorial text-[clamp(1.5rem,3.5vw,3rem)] text-white/[0.06] font-light tracking-[0.02em] italic">
              Visual identity · Festival branding · Immersive design
            </span>
            <div className="marquee-line w-12 h-px bg-[#8b6f6f]/20" />
            <span className="marquee-line font-editorial text-[clamp(0.8rem,1.8vw,1.4rem)] text-white/[0.04] tracking-[0.3em] uppercase mt-2">
              Креативное агентство
            </span>
          </div>
        </div>

        {/* Values grid */}
        <div className="values-grid grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.03] mb-24 md:mb-40">
          {values.map((v) => (
            <div
              key={v.num}
              className="value-card group relative bg-[#050505] p-8 md:p-12 lg:p-16 hover:bg-[#070707] transition-colors duration-700"
              data-cursor="hover"
            >
              {/* Number */}
              <span className="counter text-[11px] font-mono text-[#8b6f6f]/30 mb-6 md:mb-8 block">
                {v.num}
              </span>

              {/* Title */}
              <h3 className="font-editorial text-2xl md:text-3xl lg:text-4xl text-white mb-3 md:mb-4 leading-tight">
                {v.title}
              </h3>

              {/* Description */}
              <p className="text-[13px] md:text-[14px] text-white/30 leading-relaxed max-w-md">
                {v.desc}
              </p>

              {/* Bottom accent line */}
              <div className="accent-line absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[#8b6f6f]/0 via-[#8b6f6f]/30 to-[#8b6f6f]/0 origin-left" />
            </div>
          ))}
        </div>

        {/* Process */}
        <div>
          <div className="mb-12 md:mb-20">
            <div className="process-eyebrow mb-6">
              <span className="section-label">Процесс</span>
            </div>
            <h2
              className="font-editorial font-semibold leading-[0.9] tracking-[-0.03em] text-white"
              style={{ perspective: "600px" }}
            >
              <div className="process-title-line overflow-hidden">
                <span className="block text-[clamp(2.5rem,7vw,6rem)]">Как мы</span>
              </div>
              <div className="process-title-line overflow-hidden">
                <span className="block text-[clamp(2.5rem,7vw,6rem)] text-[#b09090]">
                  работаем
                </span>
              </div>
            </h2>
            <div className="mt-6 md:mt-8 h-px w-16 bg-gradient-to-r from-[#8b6f6f]/60 to-transparent" />
          </div>

          {/* Steps */}
          <div className="steps-grid grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.03]">
            {steps.map((s) => (
              <div
                key={s.num}
                className="step-card group relative bg-[#050505] p-8 md:p-12 lg:p-16 hover:bg-[#070707] transition-colors duration-700"
                data-cursor="hover"
              >
                {/* Step number */}
                <div className="flex items-baseline gap-4 md:gap-6 mb-6 md:mb-8">
                  <span className="counter text-[11px] font-mono text-[#8b6f6f]/30">
                    {s.num}
                  </span>
                  <div className="flex-1 h-px bg-white/[0.04]" />
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl text-white mb-2 md:mb-3 font-light">
                  {s.title}
                </h3>

                {/* Text */}
                <p className="text-[13px] md:text-[14px] text-white/30 leading-relaxed">
                  {s.text}
                </p>

                {/* Hover accent */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[#8b6f6f]/0 via-[#8b6f6f]/30 to-[#8b6f6f]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
