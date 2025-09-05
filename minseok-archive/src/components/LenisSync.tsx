// src/components/LenisSync.tsx (새 파일)
import { useFrame } from "@react-three/fiber";
import { useLenisContext } from "../context/LenisContext"; // LenisContext에서 가져온 훅 사용

const LenisSync = () => {
  const lenis = useLenisContext();

  useFrame((state) => {
    if (lenis) {
      // R3F의 매 프레임마다 Lenis의 스크롤 상태를 업데이트
      lenis.raf(state.clock.elapsedTime * 1000);
    }
  });

  return null; // 이 컴포넌트는 아무것도 렌더링하지 않습니다.
};

export default LenisSync;
