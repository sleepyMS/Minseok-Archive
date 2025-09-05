// src/sections/Hero.tsx

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion, useScroll, useTransform } from "framer-motion";
import { Environment, OrbitControls } from "@react-three/drei";
import type { MotionValue } from "framer-motion";
import type { Group } from "three";

// Custom Hooks & Components
import { useTheme } from "../hooks/useTheme";
import useIsMobile from "../hooks/useIsMobile";
import Crystal from "../components/canvas/Crystal";
import LenisSync from "../components/LenisSync";

// ============================================================================
// 1. 타이핑 효과를 위한 텍스트 컴포넌트
// ============================================================================
const TypingText = ({ text }: { text: string }) => {
  const textVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.5 * i },
    }),
  };
  const charVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  return (
    <motion.h1
      variants={textVariants}
      initial="hidden"
      animate="visible"
      className="text-4xl md:text-6xl font-bold text-primary leading-tight"
    >
      {text.split("").map((char, index) => (
        <motion.span key={index} variants={charVariants}>
          {char}
        </motion.span>
      ))}
    </motion.h1>
  );
};

// ============================================================================
// 2. 3D 객체들을 그룹으로 묶고, 씬 내부에서 스케일을 제어하는 컴포넌트
// ============================================================================
const ThreeScene = ({
  scale,
  opacity,
  color,
  metalness,
  roughness,
}: {
  scale: MotionValue<number>;
  opacity: MotionValue<number>;
  color: string;
  metalness: number;
  roughness: number;
}) => {
  const groupRef = useRef<Group>(null);

  // R3F의 렌더링 루프에 맞춰 매 프레임 실행됩니다.
  useFrame(() => {
    if (groupRef.current) {
      // MotionValue에서 현재 scale 값을 직접 읽어와 3D 그룹에 적용합니다.
      const currentScale = scale.get();
      groupRef.current.scale.set(currentScale, currentScale, currentScale);
    }
  });

  return (
    <group ref={groupRef}>
      <Crystal
        color={color}
        metalness={metalness}
        roughness={roughness}
        opacity={opacity}
      />
      {/* 다른 3D 객체가 있다면 이 그룹 안에 추가하면 됩니다. */}
    </group>
  );
};

// ============================================================================
// 3. 메인 Hero 컴포넌트
// ============================================================================
const Hero = () => {
  const { theme } = useTheme();
  const targetRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  // Framer Motion의 MotionValue들은 그대로 사용합니다.
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 7]);
  const opacityMotionValue = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 1.0], [1, 0]);

  const crystalProps = {
    dark: { color: "#8A2BE2", metalness: 0.7, roughness: 0.1 },
    light: { color: "#C77DFF", metalness: 0.8, roughness: 0.1 },
  };
  const currentProps =
    theme === "dark" ? crystalProps.dark : crystalProps.light;

  return (
    <section ref={targetRef} className="relative h-[150vh]">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        <motion.div
          className="absolute w-full h-full"
          data-interactive
          data-cursor-text={"Drag"}
        >
          <Canvas
            // dpr={[1, 1.5]}
            style={{ pointerEvents: isMobile ? "none" : "auto" }}
            camera={{ position: [0, 0, 5], fov: 45 }}
          >
            <LenisSync />

            {/* 조명 및 환경 설정 */}
            <ambientLight intensity={0.5} />
            <directionalLight
              position={[5, 5, 5]}
              intensity={1.5}
              color="white"
            />
            <directionalLight
              position={[-5, -5, -5]}
              intensity={0.5}
              color={currentProps.color}
            />

            <ThreeScene
              scale={scale}
              opacity={opacityMotionValue}
              {...currentProps}
            />

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enabled={!isMobile}
            />
            <Environment preset="city" />
          </Canvas>
        </motion.div>

        {/* 자기소개 텍스트 */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="relative z-10 text-center pointer-events-none"
        >
          <TypingText text="Hello, I'm Minseok." />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.5 }}
            className="text-lg md:text-xl text-secondary mt-4"
          >
            A Creative Full Stack Developer.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
