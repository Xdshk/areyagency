"use client";

import { useEffect, useState } from "react";

/**
 * Full-screen loader shown for a minimum of 2 seconds on first visit.
 * Prevents the "laggy first render" feeling while fonts/images load.
 * Uses sessionStorage so it only plays once per browser session.
 */
export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const SEEN_KEY = "arey-loader-seen";
    const alreadySeen = sessionStorage.getItem(SEEN_KEY);

    if (alreadySeen) {
      setVisible(false);
      return;
    }

    // Minimum 2 s display
    const timer = setTimeout(() => {
      setFading(true);
      setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem(SEEN_KEY, "1");
      }, 700);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#050505] transition-opacity duration-700 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Animated brand name */}
      <div className="flex flex-col items-center gap-5">
        <span
          className="font-brand text-5xl md:text-7xl text-white loader-brand"
          style={{ fontFamily: "var(--font-brand)" }}
        >
          Arey Agency
        </span>

        {/* Animated accent line */}
        <div className="loader-line-wrap">
          <div className="loader-line" />
        </div>

        {/* Shimmer dots */}
        <div className="flex items-center gap-3 mt-2">
          <span className="loader-dot" style={{ animationDelay: "0s" }} />
          <span className="loader-dot" style={{ animationDelay: "0.2s" }} />
          <span className="loader-dot" style={{ animationDelay: "0.4s" }} />
        </div>
      </div>

      <style jsx>{`
        .loader-brand {
          animation: brandPulse 2s ease-in-out infinite;
        }
        @keyframes brandPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }

        .loader-line-wrap {
          width: 80px;
          height: 1px;
          background: rgba(139, 111, 111, 0.1);
          overflow: hidden;
        }
        .loader-line {
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, var(--accent), transparent);
          animation: lineDraw 2.5s ease-in-out infinite;
        }
        @keyframes lineDraw {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }

        .loader-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--accent);
          animation: dotBlink 1.2s ease-in-out infinite;
        }
        @keyframes dotBlink {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}
