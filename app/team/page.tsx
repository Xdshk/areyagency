"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const members = [
  {
    name: "Анна Чевычелова",
    role: "Креативный директор",
    desc: "Основатель агентства. Разрабатывает креативную стратегию и руководит визуальными решениями.",
    username: "annswx",
    photo: "/team/anna.jpg",
  },
  {
    name: "Максим Разуваев",
    role: "3D-художник",
    desc: "Превращает идеи в объёмные визуалы и motion-дизайн.",
    username: "mixseSO",
    photo: "/team/maksim.jpg",
  },
  {
    name: "Ангелина Ежикова",
    role: "Арт-директор",
    desc: "Разрабатывает фирменные стили и визуальные системы.",
    username: "gelechhka",
    photo: "/team/angelina.jpg",
  },
  {
    name: "Елизавета Бабкина",
    role: "SMM-специалист",
    desc: "Ведёт социальные сети и пишет контент-стратегию.",
    username: "",
    photo: "/team/liza.jpg",
  },
  {
    name: "Оля Фролова",
    role: "Графический дизайнер",
    desc: "Создаёт визуальные решения от логотипов до полноразмерных макетов.",
    username: "",
    photo: "/team/olya.jpg",
  },
];

export default function TeamPage() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".team-eyebrow", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".team-eyebrow",
          start: "top 85%",
        },
      });

      gsap.from(".team-title-line", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".team-title-line",
          start: "top 85%",
        },
      });

      gsap.from(".team-member", {
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".team-grid",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const img = card.querySelector(".member-photo") as HTMLElement;
      if (img) {
        gsap.to(img, {
          y: -y * 20,
          duration: 0.6,
          ease: "power2.out",
        });
      }
    },
    []
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const img = e.currentTarget.querySelector(".member-photo") as HTMLElement;
      if (img) {
        gsap.to(img, {
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      }
    },
    []
  );

  return (
    <section ref={sectionRef} className="relative px-6 py-24 md:py-40 md:px-10">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
      </div>

      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="mb-12 md:mb-20">
          <div className="team-eyebrow mb-6">
            <span className="section-label">Команда</span>
          </div>
          <h1
            className="font-editorial font-semibold leading-[0.9] tracking-[-0.03em] text-white"
            style={{ perspective: "600px" }}
          >
            <div className="team-title-line overflow-hidden">
              <span className="block text-[clamp(2.5rem,7vw,6rem)]">Люди, которые</span>
            </div>
            <div className="team-title-line overflow-hidden">
              <span className="block text-[clamp(2.5rem,7vw,6rem)] text-[#b09090]">
                делают сильный визуал
              </span>
            </div>
          </h1>
          <div className="mt-6 md:mt-8 h-px w-16 bg-gradient-to-r from-[#8b6f6f]/60 to-transparent" />
        </div>

        {/* Team grid */}
        <div className="team-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-4">
          {members.map((m, i) => (
            <div
              key={m.name}
              className="team-member group relative bg-[#050505] hover:bg-[#070707] transition-colors duration-700"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Photo */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={m.photo}
                  alt={m.name}
                  fill
                  className="member-photo object-cover will-change-transform"
                  loading="lazy"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />

                {/* Number */}
                <div className="absolute top-4 right-4">
                  <span className="counter text-[10px] font-mono text-white/15">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5 md:p-6">
                <h3 className="text-[15px] md:text-[16px] text-white font-light leading-tight">
                  {m.name}
                </h3>
                <p className="text-[11px] md:text-[12px] text-white/35 mt-1.5 tracking-wide">
                  {m.role}
                </p>
                <p className="text-[11px] text-white/20 mt-3 leading-relaxed line-clamp-2">
                  {m.desc}
                </p>
                {m.username && (
                  <a
                    href={`https://t.me/${m.username}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-white/20 hover:text-white/50 transition-colors duration-500 mt-3 inline-block tracking-wide"
                  >
                    @{m.username}
                  </a>
                )}
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[#8b6f6f]/0 via-[#8b6f6f]/30 to-[#8b6f6f]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
