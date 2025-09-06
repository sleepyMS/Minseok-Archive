// src/components/canvas/Crystal.tsx

import { useEffect, useState, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Mesh, MathUtils } from "three";
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

  const [isIntroFinished, setIntroFinished] = useState(false);

  // 초기 등장 애니메이션 (크기, 회전)을 위한 useSpring
  const { scale, rotX, rotY, rotZ } = useSpring({
    from: {
      scale: [0.1, 0.1, 0.1] as [number, number, number],
      rotX: 0,
      rotY: Math.PI * 4,
      rotZ: 0,
    },
    to: {
      scale: [crystalSize, crystalSize, crystalSize] as [
        number,
        number,
        number
      ],
      rotX: 0,
      rotY: 0,
      rotZ: 0,
    },
    config: { mass: 2.5, tension: 100, friction: 50 },
    onRest: () => setIntroFinished(true),
  });

  // 재질(색상, 반사 등) 변경을 위한 별도의 useSpring
  const [materialProps, api] = useSpring(() => ({
    color,
    metalness,
    roughness,
    opacity: opacity.get(),
    config: { mass: 2, tension: 200, friction: 50 },
  }));

  // 테마 변경 시 재질 속성을 업데이트하는 로직
  useEffect(() => {
    api.start({ color, metalness, roughness });
  }, [api, color, metalness, roughness]);

  // 스크롤 시 투명도를 업데이트하는 로직
  useEffect(() => {
    const unsubscribe = opacity.onChange((latest) => {
      api.start({ opacity: latest, immediate: true });
    });
    return () => unsubscribe();
  }, [opacity, api]);

  // 마우스 인터랙션을 위한 useFrame
  useFrame((state, delta) => {
    if (meshRef.current && isIntroFinished) {
      if (isMobile) {
        meshRef.current.rotation.y += delta * 0.3;
      } else {
        const x = (state.mouse.x * viewport.width) / 20;
        const y = (state.mouse.y * viewport.height) / 20;
        meshRef.current.rotation.y = MathUtils.lerp(
          meshRef.current.rotation.y,
          x,
          0.1
        );
        meshRef.current.rotation.x = MathUtils.lerp(
          meshRef.current.rotation.x,
          y,
          0.1
        );
      }
    }
  });

  return (
    // 애니메이션 속성을 올바른 컴포넌트에 각각 적용
    <a.mesh
      ref={meshRef}
      scale={scale}
      rotation-x={rotX}
      rotation-y={rotY}
      rotation-z={rotZ}
      castShadow
    >
      <icosahedronGeometry args={[1, 1]} />
      <a.meshPhysicalMaterial
        color={materialProps.color}
        metalness={materialProps.metalness}
        roughness={materialProps.roughness}
        transparent
        opacity={materialProps.opacity}
      />
    </a.mesh>
  );
};

export default Crystal;
