"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactForm from "./ContactForm";

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    label: "Телефон",
    value: "8 951 078 83 81",
    href: "tel:+79510788381",
  },
  {
    label: "Email",
    value: "annaarey22@yandex.ru",
    href: "mailto:annaarey22@yandex.ru",
  },
  {
    label: "Адрес",
    value: "БЦ «Креатив», ул. Творческая, 1",
    sub: "Москва",
  },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-eyebrow", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-eyebrow",
          start: "top 85%",
        },
      });

      gsap.from(".contact-title-line", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-title-line",
          start: "top 85%",
        },
      });

      gsap.from(".contact-desc", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-desc",
          start: "top 85%",
        },
      });

      gsap.from(".info-card", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".info-grid",
          start: "top 85%",
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
        {/* Header */}
        <div className="mb-12 md:mb-20">
          <div className="contact-eyebrow mb-6">
            <span className="section-label">Контакты</span>
          </div>
          <h2
            className="font-editorial font-semibold leading-[0.9] tracking-[-0.03em] text-white"
            style={{ perspective: "600px" }}
          >
            <div className="contact-title-line overflow-hidden">
              <span className="block text-[clamp(2.5rem,7vw,6rem)]">Обсудим</span>
            </div>
            <div className="contact-title-line overflow-hidden">
              <span className="block text-[clamp(2.5rem,7vw,6rem)] text-[#b09090]">
                проект
              </span>
            </div>
          </h2>
          <div className="mt-6 md:mt-8 h-px w-16 bg-gradient-to-r from-[#8b6f6f]/60 to-transparent" />
          <p className="contact-desc mt-6 md:mt-8 text-[15px] md:text-[17px] text-white/30 max-w-md leading-relaxed font-light">
            Напишите коротко: задачу, сроки, форматы.
            <br />
            Ответим в течение рабочего дня.
          </p>
        </div>

        {/* Form */}
        <ContactForm />

        {/* Contact info */}
        <div className="info-grid grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.03]">
          {contactInfo.map((info) => (
            <div
              key={info.label}
              className="info-card group bg-[#050505] p-8 md:p-10 hover:bg-[#070707] transition-colors duration-700"
            >
              <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-white/20 mb-4 md:mb-5">
                {info.label}
              </p>
              {info.href ? (
                <a
                  href={info.href}
                  className="text-[15px] md:text-[17px] text-white/50 hover:text-white transition-colors duration-500 leading-relaxed"
                >
                  {info.value}
                </a>
              ) : (
                <div>
                  <p className="text-[15px] md:text-[17px] text-white/50 leading-relaxed">
                    {info.value}
                  </p>
                  {info.sub && (
                    <p className="text-[15px] md:text-[17px] text-white/30 mt-1">
                      {info.sub}
                    </p>
                  )}
                </div>
              )}

              {/* Bottom accent */}
              <div className="mt-6 md:mt-8 h-px w-8 bg-white/[0.06] group-hover:w-16 group-hover:bg-[#8b6f6f]/30 transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
