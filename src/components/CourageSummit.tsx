"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { prefersReducedMotion } from "@/lib/gsap";

// Deterministic hash-based pseudo-random — a rugged peak, not a true
// random one, so the silhouette stays intentional rather than noisy.
function hash(i: number) {
  const s = Math.sin(i * 127.1) * 43758.5453;
  return s - Math.floor(s);
}

function buildPeakGeometry() {
  const geo = new THREE.ConeGeometry(1.15, 2, 7, 5, true).toNonIndexed();
  const pos = geo.attributes.position;

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const n = hash(i) - 0.5;
    // Displace outward (rugged rock face) more toward the base, less near
    // the summit, so the peak itself stays sharp.
    const heightFactor = 1 - (y + 1) / 2;
    const radial = 1 + n * 0.22 * heightFactor;
    pos.setXYZ(i, x * radial, y + n * 0.05 * heightFactor, z * radial);
  }

  geo.computeVertexNormals();
  return geo;
}

function Peak() {
  const groupRef = useRef<THREE.Group>(null);
  const geometry = useMemo(() => buildPeakGeometry(), []);
  const reduced = useMemo(() => prefersReducedMotion(), []);

  useFrame((_, delta) => {
    if (reduced || !groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.15;
  });

  return (
    <group ref={groupRef}>
      {/* Summit rock */}
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial color="#12110f" flatShading roughness={0.85} metalness={0.05} />
      </mesh>

      {/* Flag pole + cloth, planted at the summit */}
      <group position={[0, 1, 0]}>
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.8, 6]} />
          <meshStandardMaterial color="#d8d4c8" roughness={0.4} />
        </mesh>
        <mesh position={[0.16, 0.68, 0]}>
          <planeGeometry args={[0.32, 0.2]} />
          <meshStandardMaterial color="#d0021b" side={THREE.DoubleSide} flatShading roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
}

export default function CourageSummit({ className }: { className?: string }) {
  const reduced = useMemo(() => prefersReducedMotion(), []);

  return (
    <div className={className} aria-hidden data-hover>
      <Canvas
        camera={{ position: [2.6, 1.2, 2.8], fov: 38 }}
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[3, 4, 2]} intensity={1.4} color="#f5f5f2" />
        <directionalLight position={[-3, 1, -2]} intensity={0.5} color="#8a8a86" />
        <Peak />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={!reduced}
          autoRotateSpeed={0.6}
          minPolarAngle={Math.PI / 2.6}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>
    </div>
  );
}
