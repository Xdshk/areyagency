# CLAUDE.md

Этот файл содержит руководство по работе с проектом Arey Studio.

## Что это
Портфолио-сайт креативного агентства с премиальным дизайном, GSAP-анимациями и Lenis smooth scroll.

## Команды
- `npm run dev` — запуск dev-сервера
- `npm run build` — сборка для продакшена
- `npm run lint` — проверка ESLint

## Установленные пакеты
- gsap — анимации
- lenis — smooth scroll
- framer-motion — React-анимации
- react-pdf — просмотр PDF
- next/image — оптимизация изображений

## Архитектура
- `app/layout.tsx` — корневой layout с Lenis scroll
- `app/page.tsx` — главная страница
- `app/globals.css` — глобальные стили, кастомные классы
- `components/Hero.tsx` — главный экран с GSAP-анимацией
- `components/WorksSection.tsx` — секция работ с сеткой проектов
- `components/About.tsx` — о нас, ценности, процесс
- `components/ContactSection.tsx` — контакты и форма
- `components/ContactForm.tsx` — форма отправки (Formspree)
- `components/cases.ts` — данные проектов

## Дизайн-система
- Фон: #050505 (глубокий чёрный)
- Акцент: #8b6f6f (приглушённый тёмно-розовый)
- Типографика: Spectral (editorial), Great Vibes (brand)
- Анимации: GSAP + ScrollTrigger для scroll-эффектов
- Скролл: Lenis для плавного скролла

## Цвета
- bg: #050505
- accent: #8b6f6f
- text: #f5f5f5
- muted: rgba(255,255,255,0.3-0.5)
