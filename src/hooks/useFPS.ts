"use client";

import { useState, useEffect, useRef } from "react";

export function useFPS(): number {
  const [fps, setFps] = useState(0);
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());

  useEffect(() => {
    let animationFrameId: number;

    const measureFps = () => {
      frameCount.current++;
      const currentTime = performance.now();
      const delta = currentTime - lastTime.current;

      if (delta >= 1000) {
        setFps(Math.round((frameCount.current * 1000) / delta));
        frameCount.current = 0;
        lastTime.current = currentTime;
      }

      animationFrameId = requestAnimationFrame(measureFps);
    };

    animationFrameId = requestAnimationFrame(measureFps);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return fps;
}
