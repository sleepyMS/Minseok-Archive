// src/components/canvas/Crystal.tsx
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh, MeshStandardMaterial } from "three";
import { useSpring, a } from "@react-spring/three";

interface CrystalProps {
  color: string;
  metalness: number;
  roughness: number;
}

const Crystal = ({ color, metalness, roughness }: CrystalProps) => {
  const meshRef = useRef<Mesh>(null);
  const { viewport } = useThree();

  // props가 변경될 때마다 애니메이션 적용
  const springs = useSpring({
    color: color,
    metalness: metalness,
    roughness: roughness,
    config: { mass: 2, tension: 200, friction: 50 },
  });

  // 마우스 위치에 따라 회전
  useFrame(({ mouse }) => {
    if (meshRef.current) {
      const x = (mouse.x * viewport.width) / 20;
      const y = (mouse.y * viewport.height) / 20;
      meshRef.current.rotation.set(y, x, 0);
    }
  });

  return (
    <a.mesh ref={meshRef} rotation-x={0.3}>
      <icosahedronGeometry args={[1.5, 1]} />
      <a.meshStandardMaterial
        color={springs.color} // 애니메이션 값 사용
        metalness={springs.metalness} // 애니메이션 값 사용
        roughness={springs.roughness} // 애니메이션 값 사용
      />
    </a.mesh>
  );
};

export default Crystal;
