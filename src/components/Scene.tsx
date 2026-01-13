"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo, useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { ParticleText } from "./ParticleText";
import * as THREE from "three";

interface SceneProps {
  mousePosition: { normalizedX: number; normalizedY: number };
  onParticleCount?: (count: number) => void;
  text?: string;
}

// Hook to get responsive camera settings
function useResponsiveCamera() {
  const [settings, setSettings] = useState({
    position: [0, 0, 8] as [number, number, number],
    fov: 45,
    dpr: [1, 2] as [number, number],
  });

  useEffect(() => {
    const updateSettings = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setSettings({
          position: [0, 0, 10],
          fov: 50,
          dpr: [1, 1.5],
        });
      } else if (width < 768) {
        setSettings({
          position: [0, 0, 9],
          fov: 48,
          dpr: [1, 1.5],
        });
      } else {
        setSettings({
          position: [0, 0, 8],
          fov: 45,
          dpr: [1, 2],
        });
      }
    };

    updateSettings();
    window.addEventListener('resize', updateSettings);
    return () => window.removeEventListener('resize', updateSettings);
  }, []);

  return settings;
}

export function Scene({ mousePosition, onParticleCount, text = "SAYLOR" }: SceneProps) {
  const cameraSettings = useResponsiveCamera();

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: cameraSettings.position, fov: cameraSettings.fov }}
        dpr={cameraSettings.dpr}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>
          {/* Subtle ambient stars */}
          <AmbientStars />

          {/* Main text */}
          <ParticleText
            text={text}
            mousePosition={mousePosition}
            onParticleCount={onParticleCount}
          />

          {/* Minimal cursor glow */}
          <CursorGlow mousePosition={mousePosition} />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Very subtle background stars
function AmbientStars() {
  const count = 120;

  const { positions, opacities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const op = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 2] = -5 - Math.random() * 10;
      op[i] = Math.random() * 0.15 + 0.05;
    }

    return { positions: pos, opacities: op };
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-opacity" count={count} array={opacities} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={`
          attribute float opacity;
          varying float vOpacity;
          void main() {
            vOpacity = opacity;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            gl_PointSize = 2.0;
          }
        `}
        fragmentShader={`
          varying float vOpacity;
          void main() {
            vec2 center = gl_PointCoord - vec2(0.5);
            float dist = length(center);
            float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
            gl_FragColor = vec4(0.8, 0.85, 0.95, alpha * vOpacity);
          }
        `}
      />
    </points>
  );
}

// Minimal cursor following light
function CursorGlow({ mousePosition }: { mousePosition: { normalizedX: number; normalizedY: number } }) {
  const ref = useRef<THREE.Points>(null);
  const smoothPos = useRef({ x: 0, y: 0 });

  useFrame(() => {
    if (!ref.current) return;

    const targetX = mousePosition.normalizedX * 4.5;
    const targetY = mousePosition.normalizedY * 2.8;

    smoothPos.current.x += (targetX - smoothPos.current.x) * 0.08;
    smoothPos.current.y += (targetY - smoothPos.current.y) * 0.08;

    const positions = ref.current.geometry.attributes.position.array as Float32Array;
    positions[0] = smoothPos.current.x;
    positions[1] = smoothPos.current.y;
    positions[2] = 0.5;
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  const position = useMemo(() => new Float32Array([0, 0, 0.5]), []);

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={1} array={position} itemSize={3} />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={`
          void main() {
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            gl_PointSize = 60.0;
          }
        `}
        fragmentShader={`
          void main() {
            vec2 center = gl_PointCoord - vec2(0.5);
            float dist = length(center);
            float alpha = exp(-dist * 4.0) * 0.15;
            gl_FragColor = vec4(0.9, 0.92, 1.0, alpha);
          }
        `}
      />
    </points>
  );
}
