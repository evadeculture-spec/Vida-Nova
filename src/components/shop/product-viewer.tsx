"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  Lightformer,
  MeshDistortMaterial,
  OrbitControls,
} from "@react-three/drei";
import * as THREE from "three";

/**
 * Liquid-chrome form — an abstract, on-brand stand-in for a 3D garment.
 * Reflections come from procedural Lightformers (no external HDRI), so the
 * scene is fully self-contained and reliable offline.
 */
function ChromeForm({ reduced }: { reduced: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (mesh.current && !reduced) {
      mesh.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <Float
      speed={reduced ? 0 : 1.4}
      rotationIntensity={reduced ? 0 : 0.5}
      floatIntensity={reduced ? 0 : 0.8}
    >
      <mesh ref={mesh} scale={1.6}>
        <icosahedronGeometry args={[1, 64]} />
        <MeshDistortMaterial
          color="#bfbfbf"
          metalness={1}
          roughness={0.12}
          distort={reduced ? 0.15 : 0.38}
          speed={reduced ? 0 : 1.6}
          envMapIntensity={1.4}
        />
      </mesh>
    </Float>
  );
}

function StudioEnv() {
  return (
    <Environment resolution={256}>
      <group rotation={[-Math.PI / 3, 0, 0]}>
        <Lightformer
          intensity={2}
          position={[0, 5, -9]}
          scale={[10, 10, 1]}
          color="#ffffff"
        />
        <Lightformer
          intensity={3}
          position={[-5, 1, -1]}
          scale={[10, 2, 1]}
          color="#f5f5f5"
        />
        <Lightformer
          intensity={2}
          position={[5, -1, -1]}
          scale={[10, 2, 1]}
          color="#999999"
        />
        <Lightformer
          intensity={1.5}
          position={[0, -5, 2]}
          scale={[10, 10, 1]}
          color="#ffffff"
        />
      </group>
    </Environment>
  );
}

export function ProductViewer() {
  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    // Defer WebGL to the client; gate motion on a browser-only media query.
    /* eslint-disable react-hooks/set-state-in-effect */
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setMounted(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  return (
    <div className="crosshairs relative h-full w-full overflow-hidden rounded-[var(--radius-md)] bg-gradient-to-b from-coal to-ink">
      <span className="eyebrow absolute left-4 top-4 z-10 text-[0.6rem]">
        3D · Drag to orbit
      </span>
      <span className="eyebrow absolute bottom-4 right-4 z-10 text-[0.6rem]">
        WebGL
      </span>

      {mounted ? (
        <Canvas
          camera={{ position: [0, 0, 5], fov: 35 }}
          gl={{ alpha: true, antialias: true }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.4} />
          <ChromeForm reduced={reduced} />
          <StudioEnv />
          <ContactShadows
            position={[0, -2.2, 0]}
            opacity={0.5}
            scale={12}
            blur={3}
            far={4}
            color="#000000"
          />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={!reduced}
            autoRotateSpeed={0.5}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.6}
          />
        </Canvas>
      ) : (
        <div className="flex h-full items-center justify-center">
          <span className="eyebrow animate-pulse">Loading model…</span>
        </div>
      )}
    </div>
  );
}
