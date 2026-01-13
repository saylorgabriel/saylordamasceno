"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleTextProps {
  text: string;
  mousePosition: { normalizedX: number; normalizedY: number };
  onParticleCount?: (count: number) => void;
}

// Perlin noise
const createNoise = () => {
  const permutation = Array.from({ length: 256 }, (_, i) => i);
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [permutation[i], permutation[j]] = [permutation[j], permutation[i]];
  }
  const p = [...permutation, ...permutation];

  const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (a: number, b: number, t: number) => a + t * (b - a);
  const grad = (hash: number, x: number, y: number) => {
    const h = hash & 3;
    const u = h < 2 ? x : y;
    const v = h < 2 ? y : x;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  };

  return (x: number, y: number) => {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    const u = fade(x);
    const v = fade(y);
    const A = p[X] + Y;
    const B = p[X + 1] + Y;
    return lerp(
      lerp(grad(p[A], x, y), grad(p[B], x - 1, y), u),
      lerp(grad(p[A + 1], x, y - 1), grad(p[B + 1], x - 1, y - 1), u),
      v
    );
  };
};

export function ParticleText({ text, mousePosition, onParticleCount }: ParticleTextProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
  const [particleCount, setParticleCount] = useState(0);
  const originalPositions = useRef<Float32Array | null>(null);
  const velocities = useRef<Float32Array | null>(null);
  const time = useRef(0);
  const noise = useMemo(() => createNoise(), []);

  useEffect(() => {
    const createParticles = async () => {
      try {
        await document.fonts.load("300 100px Orbitron");
        await new Promise(resolve => setTimeout(resolve, 200));
      } catch (e) {
        // Fallback
      }

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const fontSize = 90;
      const textWidth = text.length * fontSize * 0.72;
      canvas.width = textWidth + 60;
      canvas.height = fontSize * 1.3;

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const fontLoaded = document.fonts.check("300 90px Orbitron");
      const fontFamily = fontLoaded ? "Orbitron" : "SF Pro Display, -apple-system, sans-serif";

      ctx.font = `300 ${fontSize}px ${fontFamily}`;
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      const positions: number[] = [];
      const gap = 1.2; // Very dense

      for (let y = 0; y < canvas.height; y += gap) {
        for (let x = 0; x < canvas.width; x += gap) {
          const i = (Math.floor(y) * canvas.width + Math.floor(x)) * 4;
          const brightness = data[i];

          if (brightness > 50) {
            const px = (x - canvas.width / 2) * 0.02;
            const py = -(y - canvas.height / 2) * 0.02;
            const pz = 0;
            positions.push(px, py, pz);
          }
        }
      }

      const count = positions.length / 3;
      setParticleCount(count);
      onParticleCount?.(count);

      originalPositions.current = new Float32Array(positions);
      velocities.current = new Float32Array(count * 2);

      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(positions), 3));

      // Very uniform sizes for smooth appearance
      const sizes = new Float32Array(count);
      const opacities = new Float32Array(count);
      for (let i = 0; i < count; i++) {
        sizes[i] = 0.18 + Math.random() * 0.06;
        opacities[i] = 0.85 + Math.random() * 0.15;
      }
      geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
      geo.setAttribute("opacity", new THREE.BufferAttribute(opacities, 1));
      setGeometry(geo);
    };

    createParticles();
  }, [text, onParticleCount]);

  useFrame((state, delta) => {
    if (!pointsRef.current || !originalPositions.current || !velocities.current) return;

    time.current += delta * 0.12;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const original = originalPositions.current;
    const vel = velocities.current;

    const mx = mousePosition.normalizedX * 5;
    const my = mousePosition.normalizedY * 3;

    const springStrength = 0.035;
    const damping = 0.975;
    const noiseScale = 0.25;
    const noiseStrength = 0.004;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const i2 = i * 2;

      // Very subtle organic drift
      const noiseX = noise(original[i3] * noiseScale + time.current, original[i3 + 1] * noiseScale) * noiseStrength;
      const noiseY = noise(original[i3] * noiseScale, original[i3 + 1] * noiseScale + time.current) * noiseStrength;
      const breathe = Math.sin(time.current * 0.3 + i * 0.0003) * 0.002;

      let targetX = original[i3] + noiseX;
      let targetY = original[i3 + 1] + noiseY + breathe;
      let targetZ = 0;

      // Soft cursor influence
      const dx = positions[i3] - mx;
      const dy = positions[i3 + 1] - my;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 0.5 && dist > 0.001) {
        const influence = Math.pow(1 - dist / 0.5, 2.5) * 0.04;
        const angle = Math.atan2(dy, dx);
        targetX += Math.cos(angle) * influence;
        targetY += Math.sin(angle) * influence;
        targetZ = influence * 0.08;
      }

      const forceX = (targetX - positions[i3]) * springStrength;
      const forceY = (targetY - positions[i3 + 1]) * springStrength;

      vel[i2] = vel[i2] * damping + forceX;
      vel[i2 + 1] = vel[i2 + 1] * damping + forceY;

      positions[i3] += vel[i2];
      positions[i3 + 1] += vel[i2 + 1];
      positions[i3 + 2] += (targetZ - positions[i3 + 2]) * 0.015;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  if (!geometry) return null;

  return (
    <points ref={pointsRef} geometry={geometry}>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={`
          attribute float size;
          attribute float opacity;
          varying float vOpacity;

          void main() {
            vOpacity = opacity;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            gl_PointSize = size * (120.0 / -mvPosition.z);
          }
        `}
        fragmentShader={`
          varying float vOpacity;

          void main() {
            vec2 center = gl_PointCoord - vec2(0.5);
            float dist = length(center);

            // Ultra-smooth gaussian-like falloff
            float alpha = exp(-dist * dist * 8.0);

            // Pure white with slight warmth
            vec3 color = vec3(0.98, 0.99, 1.0);

            gl_FragColor = vec4(color, alpha * vOpacity * 0.7);
          }
        `}
      />
    </points>
  );
}
