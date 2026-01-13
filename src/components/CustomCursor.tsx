"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

interface CustomCursorProps {
  mousePosition: { x: number; y: number };
}

export function CustomCursor({ mousePosition }: CustomCursorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const springConfig = { damping: 30, stiffness: 500, mass: 0.3 };
  const x = useSpring(mousePosition.x, springConfig);
  const y = useSpring(mousePosition.y, springConfig);

  useEffect(() => {
    x.set(mousePosition.x);
    y.set(mousePosition.y);
  }, [mousePosition.x, mousePosition.y, x, y]);

  useEffect(() => {
    // Detect touch device
    const checkTouchDevice = () => {
      const hasTouchScreen = (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(hover: none) and (pointer: coarse)').matches
      );
      setIsTouchDevice(hasTouchScreen);
    };

    checkTouchDevice();

    // Also check on resize (for responsive testing)
    window.addEventListener('resize', checkTouchDevice);

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, [role="button"]');
      setIsHovering(!!isInteractive);
    };

    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleMouseOver);

    const timer = setTimeout(() => setIsVisible(true), 100);

    return () => {
      window.removeEventListener('resize', checkTouchDevice);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleMouseOver);
      clearTimeout(timer);
    };
  }, []);

  // Don't render on touch devices or when not visible
  if (!isVisible || isTouchDevice) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999]"
      style={{
        x,
        y,
        width: isHovering ? 10 : 5,
        height: isHovering ? 10 : 5,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: "50%",
        transform: "translate(-50%, -50%)",
        transition: "width 0.2s ease, height 0.2s ease",
        mixBlendMode: "difference",
      }}
    />
  );
}
