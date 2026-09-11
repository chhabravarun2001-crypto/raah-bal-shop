"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { prefersReducedMotion } from "@/lib/gsap";

const STEP_COUNT = 6;

function Steps() {
  const groupRef = useRef<THREE.Group>(null);
  const reduced = useMemo(() => prefersReducedMotion(), []);

  const steps = useMemo(
    () =>
      Array.from({ length: STEP_COUNT }, (_, i) => {
        const height = 0.22 + i * 0.18;
        const x = -1.1 + i * 0.44;
        return { width: 0.4, height, depth: 0.4, x, y: height / 2 - 0.9 };
      }),
    []
  );

  useFrame((_, delta) => {
    if (reduced || !groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.18;
  });

  return (
    <group ref={groupRef}>
      {steps.map((s, i) => (
        <mesh key={i} position={[s.x, s.y, 0]} castShadow receiveShadow>
          <boxGeometry args={[s.width, s.height, s.depth]} />
          <meshStandardMaterial color={i === STEP_COUNT - 1 ? "#d0021b" : "#16150f"} flatShading roughness={0.8} />
        </mesh>
      ))}

      {/* Flag, planted on the top step */}
      <group position={[steps[STEP_COUNT - 1].x, steps[STEP_COUNT - 1].y + steps[STEP_COUNT - 1].height / 2, 0]}>
        <mesh position={[0, 0.36, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 0.72, 6]} />
          <meshStandardMaterial color="#d8d4c8" roughness={0.4} />
        </mesh>
        <mesh position={[0.13, 0.6, 0]}>
          <planeGeometry args={[0.28, 0.17]} />
          <meshStandardMaterial color="#f5f5f2" side={THREE.DoubleSide} flatShading roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
}

export default function CourageAscent({ className }: { className?: string }) {
  const reduced = useMemo(() => prefersReducedMotion(), []);

  return (
    <div className={className} aria-hidden data-hover>
      <Canvas camera={{ position: [2.4, 1.3, 2.6], fov: 36 }} dpr={[1, 1.75]} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 2]} intensity={1.3} color="#f5f5f2" />
        <directionalLight position={[-3, 1, -2]} intensity={0.4} color="#8a8a86" />
        <Steps />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={!reduced}
          autoRotateSpeed={0.7}
          minPolarAngle={Math.PI / 2.6}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>
    </div>
  );
}
