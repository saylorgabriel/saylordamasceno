"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleCursorProps {
  mousePosition: { normalizedX: number; normalizedY: number };
}

// Minimal, elegant cursor with subtle trailing particles
const ORBIT_COUNT = 24;
const TRAIL_COUNT = 20;

export function ParticleCursor({ mousePosition }: ParticleCursorProps) {
  const orbitRef = useRef<THREE.Points>(null);
  const trailRef = useRef<THREE.Points>(null);
  const smoothMouse = useRef({ x: 0, y: 0 });
  const time = useRef(0);
  const trailHistory = useRef<{ x: number; y: number; age: number }[]>([]);

  const { orbitPositions, trailPositions, orbitSizes, trailSizes, trailOpacities } = useMemo(() => {
    return {
      orbitPositions: new Float32Array(ORBIT_COUNT * 3),
      trailPositions: new Float32Array(TRAIL_COUNT * 3),
      orbitSizes: new Float32Array(ORBIT_COUNT),
      trailSizes: new Float32Array(TRAIL_COUNT),
      trailOpacities: new Float32Array(TRAIL_COUNT),
    };
  }, []);

  useFrame((state, delta) => {
    if (!orbitRef.current || !trailRef.current) return;

    time.current += delta;

    const targetX = mousePosition.normalizedX * 4.5;
    const targetY = mousePosition.normalizedY * 2.8;

    // Ultra-smooth mouse following with easing
    const ease = 0.12;
    smoothMouse.current.x += (targetX - smoothMouse.current.x) * ease;
    smoothMouse.current.y += (targetY - smoothMouse.current.y) * ease;

    const mx = smoothMouse.current.x;
    const my = smoothMouse.current.y;

    // Velocity for trail spawning
    const velocity = Math.sqrt(
      Math.pow(targetX - smoothMouse.current.x, 2) +
      Math.pow(targetY - smoothMouse.current.y, 2)
    );

    // Update trail history based on movement
    if (velocity > 0.001 || trailHistory.current.length === 0) {
      trailHistory.current.unshift({ x: mx, y: my, age: 0 });
      if (trailHistory.current.length > TRAIL_COUNT) {
        trailHistory.current.pop();
      }
    }

    // Age trail particles
    trailHistory.current.forEach(p => p.age += delta);

    // Subtle orbital particles - very small, delicate ring
    const orbitPos = orbitRef.current.geometry.attributes.position.array as Float32Array;
    const orbitSz = orbitRef.current.geometry.attributes.size.array as Float32Array;

    const baseRadius = 0.15;
    const breathe = Math.sin(time.current * 1.5) * 0.02;

    for (let i = 0; i < ORBIT_COUNT; i++) {
      const i3 = i * 3;
      const angle = (i / ORBIT_COUNT) * Math.PI * 2 + time.current * 0.3;
      const individualOffset = Math.sin(time.current * 2 + i * 0.8) * 0.015;
      const radius = baseRadius + breathe + individualOffset;

      orbitPos[i3] = mx + Math.cos(angle) * radius;
      orbitPos[i3 + 1] = my + Math.sin(angle) * radius;
      orbitPos[i3 + 2] = 0.5;

      // Subtle size pulsing
      orbitSz[i] = 0.3 + Math.sin(time.current * 3 + i * 0.5) * 0.1;
    }

    orbitRef.current.geometry.attributes.position.needsUpdate = true;
    orbitRef.current.geometry.attributes.size.needsUpdate = true;

    // Trail particles - fade based on age
    const trailPos = trailRef.current.geometry.attributes.position.array as Float32Array;
    const trailSz = trailRef.current.geometry.attributes.size.array as Float32Array;
    const trailOp = trailRef.current.geometry.attributes.opacity.array as Float32Array;

    for (let i = 0; i < TRAIL_COUNT; i++) {
      const i3 = i * 3;
      if (i < trailHistory.current.length) {
        const point = trailHistory.current[i];
        const fadeProgress = Math.min(point.age * 2, 1);

        trailPos[i3] = point.x;
        trailPos[i3 + 1] = point.y;
        trailPos[i3 + 2] = 0.4 - i * 0.01;

        trailSz[i] = (0.25 - i * 0.01) * (1 - fadeProgress * 0.5);
        trailOp[i] = (1 - i / TRAIL_COUNT) * (1 - fadeProgress);
      } else {
        trailPos[i3] = mx;
        trailPos[i3 + 1] = my;
        trailPos[i3 + 2] = 0;
        trailSz[i] = 0;
        trailOp[i] = 0;
      }
    }

    trailRef.current.geometry.attributes.position.needsUpdate = true;
    trailRef.current.geometry.attributes.size.needsUpdate = true;
    trailRef.current.geometry.attributes.opacity.needsUpdate = true;
  });

  return (
    <>
      {/* Subtle orbital ring */}
      <points ref={orbitRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={ORBIT_COUNT}
            array={orbitPositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={ORBIT_COUNT}
            array={orbitSizes}
            itemSize={1}
          />
        </bufferGeometry>
        <shaderMaterial
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          vertexShader={`
            attribute float size;
            varying float vSize;
            void main() {
              vSize = size;
              vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
              gl_Position = projectionMatrix * mvPosition;
              gl_PointSize = size * (150.0 / -mvPosition.z);
            }
          `}
          fragmentShader={`
            void main() {
              vec2 center = gl_PointCoord - vec2(0.5);
              float dist = length(center);
              float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
              alpha = pow(alpha, 2.0);
              vec3 color = vec3(0.85, 0.9, 1.0);
              gl_FragColor = vec4(color, alpha * 0.5);
            }
          `}
        />
      </points>

      {/* Elegant trail */}
      <points ref={trailRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={TRAIL_COUNT}
            array={trailPositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={TRAIL_COUNT}
            array={trailSizes}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-opacity"
            count={TRAIL_COUNT}
            array={trailOpacities}
            itemSize={1}
          />
        </bufferGeometry>
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
              float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
              alpha = pow(alpha, 1.8);
              vec3 color = vec3(0.8, 0.85, 0.95);
              gl_FragColor = vec4(color, alpha * vOpacity * 0.4);
            }
          `}
        />
      </points>
    </>
  );
}
