// src/components/canvas/Crystal.tsx

import React, { useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";
import { useSpring, a } from "@react-spring/three";
import useIsMobile from "../../hooks/useIsMobile";
import type { MotionValue } from "framer-motion";

interface CrystalProps {
  color: string;
  metalness: number;
  roughness: number;
  opacity: MotionValue<number>;
}

const Crystal = ({ color, metalness, roughness, opacity }: CrystalProps) => {
  const meshRef = useRef<Mesh>(null);
  const { viewport } = useThree();
  const isMobile = useIsMobile();
  const crystalSize = isMobile ? 0.75 : 1.5;

  const [springs, api] = useSpring(() => ({
    color: color,
    metalness: metalness,
    roughness: roughness,
    opacity: opacity.get(),
    config: { mass: 2, tension: 200, friction: 50 },
  }));

  useEffect(() => {
    const unsubscribe = opacity.onChange((latest) => {
      api.start({ opacity: latest, immediate: true });
    });

    return () => unsubscribe();
  }, [opacity, api]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      if (isMobile) {
        meshRef.current.rotation.y += delta * 0.3;
      } else {
        const x = (state.mouse.x * viewport.width) / 20;
        const y = (state.mouse.y * viewport.height) / 20;
        meshRef.current.rotation.set(y, x, 0);
      }
    }
  });

  return (
    <a.mesh ref={meshRef} rotation-x={0.3}>
      <icosahedronGeometry args={[crystalSize, 1]} />
      <a.meshStandardMaterial
        color={springs.color}
        metalness={springs.metalness}
        roughness={springs.roughness}
        opacity={springs.opacity}
        transparent={true}
      />
    </a.mesh>
  );
};

export default React.memo(Crystal);
