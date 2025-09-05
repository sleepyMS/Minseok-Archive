import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import Lenis from "lenis";
import { LenisContext } from "../../context/LenisContext";

export const LenisProvider = ({ children }: { children: ReactNode }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const newLenis = new Lenis();
    setLenis(newLenis);

    function raf(time: number) {
      newLenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      // 컴포넌트가 사라질 때 lenis 인스턴스를 확실히 파괴합니다.
      // (destroy가 두 번 호출되어도 안전합니다)
      newLenis.destroy();
      setLenis(null); // state도 초기화
    };
  }, []);

  return (
    // ⬇️ lenis가 null이 아닐 때만 Provider와 children을 렌더링합니다.
    <>
      {lenis && (
        <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
      )}
    </>
  );
};
