import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import Lenis from "lenis";
import { LenisContext } from "../../context/LenisContext";

export const LenisProvider = ({ children }: { children: ReactNode }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const newLenis = new Lenis();
    setLenis(newLenis);

    // ❌ 자체 루프는 여전히 제거된 상태여야 합니다.

    return () => {
      newLenis.destroy();
      setLenis(null);
    };
  }, []);

  return (
    // ⬇️ lenis가 null이 아닐 때만 Provider와 children을 렌더링하는 로직이 좋습니다.
    <>
      {lenis && (
        <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
      )}
    </>
  );
};
