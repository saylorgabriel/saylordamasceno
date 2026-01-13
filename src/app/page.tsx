"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useFPS } from "@/hooks/useFPS";
import { HUD } from "@/components/HUD";
import { CustomCursor } from "@/components/CustomCursor";
import { motion, AnimatePresence } from "framer-motion";

const Scene = dynamic(() => import("@/components/Scene").then((mod) => mod.Scene), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="text-[10px] tracking-[0.4em] text-white/20 uppercase animate-pulse">
        Loading
      </div>
    </div>
  ),
});

// Content sections based on Saylor's profile
const SECTIONS = [
  { text: "SAYLOR", subtitle: "Tech Lead • 15+ Years in Software Engineering" },
  { text: "BACK-END", subtitle: "PHP Specialist • Software Architecture" },
  { text: "AI & LLMs", subtitle: "LangChain • RAG • OpenAI • Azure AI" },
  { text: "CLOUD", subtitle: "AWS • Azure • Scalable Infrastructure" },
  { text: "LEADER", subtitle: "Engineering Teams • Product Strategy" },
];

export default function Home() {
  const mousePosition = useMousePosition();
  const fps = useFPS();
  const [particleCount, setParticleCount] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for up, 1 for down
  const isScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const currentSectionRef = useRef(currentSection);

  // Keep ref in sync with state
  useEffect(() => {
    currentSectionRef.current = currentSection;
  }, [currentSection]);

  const handleParticleCount = useCallback((count: number) => {
    setParticleCount(count);
  }, []);

  // Handle scroll/wheel events
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling.current) return;

      const delta = e.deltaY;
      if (Math.abs(delta) < 30) return; // Ignore small scrolls

      isScrolling.current = true;

      if (delta > 0 && currentSectionRef.current < SECTIONS.length - 1) {
        // Scroll down - next section
        setDirection(1);
        setCurrentSection(prev => prev + 1);
      } else if (delta < 0 && currentSectionRef.current > 0) {
        // Scroll up - previous section
        setDirection(-1);
        setCurrentSection(prev => prev - 1);
      }

      // Debounce scroll
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        isScrolling.current = false;
      }, 800);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []); // Empty dependency - effect runs only once

  const currentContent = SECTIONS[currentSection];

  return (
    <main className="relative w-screen h-screen overflow-hidden">
      {/* 3D Scene with animated text */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{
            x: direction >= 0 ? 200 : -200,
            opacity: 0
          }}
          animate={{
            x: 0,
            opacity: 1
          }}
          exit={{
            x: direction >= 0 ? -200 : 200,
            opacity: 0
          }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="fixed inset-0"
        >
          <Scene
            mousePosition={mousePosition}
            onParticleCount={handleParticleCount}
            text={currentContent.text}
          />
        </motion.div>
      </AnimatePresence>

      {/* Animated subtitle - centered below main text */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`subtitle-${currentSection}`}
          className="fixed top-[58%] left-1/2 -translate-x-1/2 text-center z-40"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="text-[12px] tracking-[0.4em] text-white/40 font-light uppercase">
            {currentContent.subtitle}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Section indicators */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
        {SECTIONS.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setDirection(index > currentSection ? 1 : -1);
              setCurrentSection(index);
            }}
            className="w-1.5 h-1.5 rounded-full cursor-none transition-all duration-300"
            style={{
              backgroundColor: index === currentSection
                ? "rgba(255, 255, 255, 0.8)"
                : "rgba(255, 255, 255, 0.2)",
            }}
            whileHover={{ scale: 1.5 }}
          />
        ))}
      </div>

      {/* Scroll hint - only show on first section */}
      {currentSection === 0 && (
        <motion.div
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.div
            className="text-[9px] tracking-[0.3em] text-white/20 uppercase"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Scroll to explore
          </motion.div>
        </motion.div>
      )}

      {/* Subtle noise overlay */}
      <div className="noise" />

      {/* HUD Elements */}
      <HUD fps={fps} particleCount={particleCount} currentSection={currentSection} totalSections={SECTIONS.length} />

      {/* Custom Cursor */}
      <CustomCursor mousePosition={mousePosition} />
    </main>
  );
}
