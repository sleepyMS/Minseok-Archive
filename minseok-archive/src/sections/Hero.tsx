// src/sections/Hero.tsx

import { useRef } from "react"; // useState 제거
import { Canvas } from "@react-three/fiber";
import { motion, useScroll, useTransform } from "framer-motion"; // useMotionValueEvent 제거
import { Environment, OrbitControls } from "@react-three/drei";
import { useTheme } from "../hooks/useTheme";
import Crystal from "../components/canvas/Crystal";
import useIsMobile from "../hooks/useIsMobile";

// TypingText 컴포넌트는 변경 없음
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
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 7]);
  const opacityMotionValue = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // ❌ 1. 리렌더링을 유발하던 useState와 useMotionValueEvent를 완전히 제거합니다.
  // const [crystalOpacity, setCrystalOpacity] = useState(1);
  // useMotionValueEvent(opacityMotionValue, "change", (latest) => {
  //   setCrystalOpacity(latest);
  // });

  const textOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

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
          style={{ scale }}
          className="absolute w-screen h-screen"
          data-interactive
          data-cursor-text={"Drag"}
        >
          <Canvas
            dpr={[1, 1.5]}
            style={{ pointerEvents: isMobile ? "none" : "auto" }}
            camera={{ position: [0, 0, 5], fov: 45 }}
          >
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

            {/* ✅ 2. Crystal 컴포넌트에 motionValue를 직접 전달합니다. */}
            <Crystal {...currentProps} opacity={opacityMotionValue} />

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
            A Creative Frontend Developer.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
