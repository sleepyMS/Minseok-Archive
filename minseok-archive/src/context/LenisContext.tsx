import { createContext, useContext } from "react";
import type Lenis from "lenis";

// 1. Lenis 인스턴스의 타입을 Context에 명시합니다.
export const LenisContext = createContext<Lenis | null>(null);

// 2. Context를 사용하기 위한 커스텀 훅을 여기에 정의합니다.
export const useLenisContext = () => {
  const context = useContext(LenisContext);
  if (context === null) {
    // 개발자에게 실수를 알려주는 에러 메시지
    throw new Error("useLenisContext must be used within a LenisProvider");
  }
  return context;
};
