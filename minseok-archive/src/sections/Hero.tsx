// src/sections/Hero.tsx

import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, useScroll, useTransform } from "framer-motion";
import { Environment, OrbitControls } from "@react-three/drei";
import { useTheme } from "../hooks/useTheme";
import Crystal from "../components/canvas/Crystal";

// 간단한 타이핑 애니메이션 컴포넌트
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

const Hero = () => {
  const { theme } = useTheme();
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  // 스크롤에 따른 3D 캔버스의 스타일 변화
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], ["0%", "-50%"]);

  // TODO: 헤더 로고의 정확한 위치를 가져오는 로직 추가 필요
  // 지금은 임시로 화면 상단 중앙으로 이동하도록 설정
  const x = useTransform(scrollYProgress, [0, 0.5], ["0%", "-50%"]);

  // 테마에 따라 Crystal에 전달할 속성 정의
  const crystalProps = {
    dark: { color: "#8A2BE2", metalness: 0.8, roughness: 0.1 },
    light: { color: "#C77DFF", metalness: 0.8, roughness: 0.1 },
  };

  const currentProps =
    theme === "dark" ? crystalProps.dark : crystalProps.light;

  return (
    <section ref={targetRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
        <motion.div
          style={{ scale, opacity, y, x }}
          className="absolute w-full h-full"
          data-interactive
          data-cursor-text={"Drag"}
        >
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            {/* 1. 조명을 더 풍부하게 만듭니다. */}
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

            <Crystal {...currentProps} />

            <OrbitControls enableZoom={false} enablePan={false} />

            {/* 2. 가장 중요한 부분: 주변 환경을 추가합니다. */}
            <Environment preset="city" />
          </Canvas>
        </motion.div>

        {/* 자기소개 텍스트 */}
        <div className="relative z-10 text-center pointer-events-none">
          <TypingText text="Hello, I'm Minseok." />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.5 }}
            className="text-lg md:text-xl text-secondary mt-4"
          >
            A Creative Frontend Developer.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
