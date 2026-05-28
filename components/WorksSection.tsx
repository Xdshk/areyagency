"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { cases } from "./cases";
import PdfThumb from "./PdfThumb";
import PdfModal from "./PdfModal";
import ImageModal from "./ImageModal";
import type { CaseItem } from "./cases";

gsap.registerPlugin(ScrollTrigger);

interface WorksSectionProps {
  maxItems?: number;
}

export default function WorksSection({ maxItems }: WorksSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("Все");
  const [modalCase, setModalCase] = useState<CaseItem | null>(null);
  const [imageModalSrc, setImageModalSrc] = useState<string | null>(null);
  const pathname = usePathname();

  const categories = ["Все", ...Array.from(new Set(cases.map((c) => c.category)))];

  const filtered =
    activeCategory === "Все"
      ? cases
      : cases.filter((c) => c.category === activeCategory);

  // If maxItems set, slice; otherwise show all
  const displayed = maxItems ? filtered.slice(0, maxItems) : filtered;
  const hasMore = maxItems ? filtered.length > maxItems : false;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".works-eyebrow", {
        y: 30, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".works-eyebrow", start: "top 85%", toggleActions: "play none none reverse" },
      });
      gsap.from(".works-title-line", {
        y: 80, opacity: 0, duration: 1.2, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".works-title-line", start: "top 85%", toggleActions: "play none none reverse" },
      });
      gsap.from(".filter-btn", {
        y: 15, duration: 0.5, stagger: 0.04, ease: "power3.out",
        scrollTrigger: { trigger: ".filter-row", start: "top 90%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Animate in cards
  useEffect(() => {
    const isMobile = window.matchMedia("(hover: none)").matches;
    const cards = sectionRef.current?.querySelectorAll(".case-card");
    if (!cards || cards.length === 0) return;
    gsap.fromTo(cards,
      { y: isMobile ? 20 : 50, opacity: 0 },
      { y: 0, opacity: 1, duration: isMobile ? 0.5 : 0.8, stagger: 0.07, ease: "power3.out" }
    );
  }, [activeCategory]);

  // Scroll parallax on each card's image
  useEffect(() => {
    const isMobile = window.matchMedia("(hover: none)").matches;
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll(".case-card");
      cards?.forEach((card) => {
        const img = card.querySelector(".card-image-el") as HTMLElement;
        if (!img) return;
        gsap.fromTo(img,
          { scale: 1.1, y: 20 },
          { scale: 1.0, y: -10, ease: "none",
            scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: isMobile ? 0.3 : 1 },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [activeCategory]);

  const handleCardMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const img = card.querySelector(".card-image-el") as HTMLElement;
    if (img) {
      gsap.to(img, { rotationY: x * 5, rotationX: -y * 5, duration: 0.6, ease: "power2.out" });
    }
  }, []);

  const handleCardMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const img = e.currentTarget.querySelector(".card-image-el") as HTMLElement;
    if (img) {
      gsap.to(img, { rotationY: 0, rotationX: 0, duration: 0.8, ease: "power3.out" });
    }
  }, []);

  // All cards open a modal (PDF/gallery → PdfModal, image → ImageModal)
  const openCase = useCallback((c: CaseItem) => {
    if (c.type === "image") {
      setImageModalSrc(c.media);
    } else {
      setModalCase(c);
    }
  }, []);

  return (
    <>
      <section ref={sectionRef} className="relative px-6 py-24 md:py-40 md:px-10">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
        </div>

        <div className="mx-auto max-w-[1400px]">
          <div className="mb-12 md:mb-20">
            <div className="works-eyebrow mb-6">
              <span className="section-label">Портфолио</span>
            </div>
            <h2 className="font-editorial font-semibold leading-[0.9] tracking-[-0.03em] text-white" style={{ perspective: "600px" }}>
              <div className="works-title-line overflow-hidden">
                <span className="block text-[clamp(2.5rem,7vw,6rem)]">Избранные</span>
              </div>
              <div className="works-title-line overflow-hidden">
                <span className="block text-[clamp(2.5rem,7vw,6rem)] text-[#b09090]">работы</span>
              </div>
            </h2>
            <div className="mt-6 md:mt-8 h-px w-16 bg-gradient-to-r from-[#8b6f6f]/60 to-transparent" />
          </div>

          <div className="filter-row mb-10 md:mb-14 relative -mx-6 px-6 md:mx-0 md:px-0 overflow-hidden">
            <div className="flex flex-row flex-nowrap gap-2 md:gap-3 overflow-x-auto overflow-y-hidden pb-2 scrollbar-none max-w-full">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`filter-btn shrink-0 grow-0 px-4 md:px-5 py-2.5 text-[10px] md:text-[11px] uppercase tracking-[0.15em] border transition-colors duration-500 cursor-pointer whitespace-nowrap flex-none ${
                    activeCategory === cat
                      ? "border-[#8b6f6f]/50 text-white bg-[#8b6f6f]/15"
                      : "border-white/[0.12] text-white/70 hover:text-white/90 hover:border-white/25"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 md:gap-6">
            {displayed.map((item) => (
              <div
                key={item.id}
                className="case-card project-card group relative min-h-[40vh] md:min-h-[50vh]"
                data-cursor="hover"
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                onClick={() => openCase(item)}
                style={{ perspective: "1000px", cursor: "pointer" }}
              >
                <div className="relative w-full h-full overflow-hidden aspect-[16/9] md:aspect-[21/9]">
                  {item.type === "image" ? (
                    <Image src={item.media} alt={item.title} fill className="card-image-el object-cover will-change-transform" loading="lazy" />
                  ) : (
                    <PdfThumb src={item.media} className="card-image-el w-full h-full" />
                  )}

                  <div className="card-overlay" />
                  <div className="card-glow" />

                  <div className="card-content max-w-lg">
                    <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-white/50 mb-2 md:mb-3 font-editorial">
                      {item.category}
                    </p>
                    <h3 className="font-editorial text-2xl md:text-3xl lg:text-4xl text-white font-medium leading-tight">
                      {item.title}
                    </h3>
                    {item.type === "pdf" && (
                      <p className="mt-2 md:mt-3 text-[11px] text-white/50 flex items-center gap-2">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>
                        Открыть презентацию
                      </p>
                    )}
                    {item.type === "image" && (
                      <p className="mt-2 md:mt-3 text-[11px] text-white/50 flex items-center gap-2">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.16-5.16a2.25 2.25 0 013.182 0l5.16 5.16m-1.5-1.5l1.41-1.41a2.25 2.25 0 013.182 0l2.91 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                        Увеличить
                      </p>
                    )}
                    {item.type === "gallery" && item.gallery && (
                      <p className="mt-2 md:mt-3 text-[11px] text-white/50 flex items-center gap-2">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                        </svg>
                        {item.gallery.length} фото
                      </p>
                    )}
                  </div>

                  <div className="absolute top-4 md:top-6 right-4 md:right-6">
                    <span className="counter text-[10px] md:text-[11px] font-mono text-white/20 group-hover:text-white/40 transition-colors duration-500">
                      {item.id}
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[#8b6f6f]/0 via-[#8b6f6f]/40 to-[#8b6f6f]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
              </div>
            ))}
          </div>

          {/* "See all" CTA — only on homepage when more exist */}
          {hasMore && (
            <div className="mt-16 md:mt-24 flex justify-center">
              <a href="/works" data-cursor="hover" className="btn-primary group magnetic-btn">
                <span className="relative z-10 flex items-center gap-3">
                  Смотреть все работы
                  <svg className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </a>
            </div>
          )}
        </div>
      </section>

      {/* PDF modal */}
      {modalCase && (
        <PdfModal src={modalCase.media} title={modalCase.title} onClose={() => setModalCase(null)} />
      )}

      {/* Image modal */}
      {imageModalSrc && (
        <ImageModal src={imageModalSrc} alt="Просмотр" onClose={() => setImageModalSrc(null)} />
      )}
    </>
  );
}
