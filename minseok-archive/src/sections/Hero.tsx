// src/sections/Hero.tsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const Box = () => {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="blueviolet" />
    </mesh>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen w-full">
      <div className="absolute inset-0 z-20 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold text-primary">안녕하세요,</h1>
        <p className="text-lg text-secondary mt-2">
          이곳에 타이핑 효과가 들어갈 예정입니다.
        </p>
      </div>
      <div className="absolute inset-0 z-10">
        <Canvas>
          <ambientLight intensity={1.5} />
          <directionalLight position={[1, 1, 5]} />
          <Box />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
    </section>
  );
};

export default Hero;
