// src/components/canvas/Crystal.tsx

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";
import { useSpring, a } from "@react-spring/three";
import useIsMobile from "../../hooks/useIsMobile";

interface CrystalProps {
  color: string;
  metalness: number;
  roughness: number;
  opacity: number;
}

const Crystal = ({ color, metalness, roughness, opacity }: CrystalProps) => {
  const meshRef = useRef<Mesh>(null);
  const { viewport } = useThree();
  const isMobile = useIsMobile();

  // ⭐️ 핵심 1: 모바일일 경우 크리스탈의 기본 크기를 절반으로 설정합니다.
  const crystalSize = isMobile ? 0.75 : 1.5;

  const springs = useSpring({
    color: color,
    metalness: metalness,
    roughness: roughness,
    opacity: opacity,
    config: { mass: 2, tension: 200, friction: 50 },
  });

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

export default Crystal;
