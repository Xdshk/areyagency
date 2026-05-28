"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".form-field", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 85%",
        },
      });
    }, formRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setStatus("sending");

      const form = e.currentTarget;
      const formData = new FormData(form);

      try {
        const response = await fetch("https://formspree.io/f/mpwazkpl", {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          setStatus("sent");
          form.reset();
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    },
    []
  );

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.03] mb-16 md:mb-24"
    >
      <div className="form-field bg-[#050505] p-6 md:p-8 lg:p-10">
        <label className="sr-only" htmlFor="name">
          Имя
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Ваше имя"
          className="w-full bg-transparent border-b border-white/[0.06] pb-3 md:pb-4 text-white placeholder:text-white/15 outline-none focus:border-[#8b6f6f]/40 transition-colors duration-500 text-[15px] md:text-[17px]"
        />
      </div>
      <div className="form-field bg-[#050505] p-6 md:p-8 lg:p-10">
        <label className="sr-only" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="your@email.com"
          className="w-full bg-transparent border-b border-white/[0.06] pb-3 md:pb-4 text-white placeholder:text-white/15 outline-none focus:border-[#8b6f6f]/40 transition-colors duration-500 text-[15px] md:text-[17px]"
        />
      </div>
      <div className="form-field md:col-span-2 bg-[#050505] p-6 md:p-8 lg:p-10">
        <label className="sr-only" htmlFor="message">
          Сообщение
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder="Расскажите о проекте: задача, форматы, сроки..."
          className="w-full bg-transparent border-b border-white/[0.06] pb-3 md:pb-4 text-white placeholder:text-white/15 outline-none focus:border-[#8b6f6f]/40 transition-colors duration-500 text-[15px] md:text-[17px] resize-none"
        />
      </div>
      <div className="form-field md:col-span-2 bg-[#050505] p-6 md:p-8 lg:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-primary group disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <span className="relative z-10">
            {status === "sending"
              ? "Отправка..."
              : status === "sent"
              ? "✓ Отправлено"
              : status === "error"
              ? "Ошибка — попробуйте снова"
              : "Отправить"}
          </span>
        </button>
        {status === "error" && (
          <a
            href="mailto:annaarey22@yandex.ru"
            className="text-[12px] text-white/25 hover:text-white/50 transition-colors duration-500 underline underline-offset-4"
          >
            annaarey22@yandex.ru
          </a>
        )}
      </div>
    </form>
  );
}
