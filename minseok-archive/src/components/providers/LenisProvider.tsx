import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import Lenis from "lenis";
import { LenisContext } from "../../context/LenisContext";

export const LenisProvider = ({ children }: { children: ReactNode }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const newLenis = new Lenis();
    setLenis(newLenis);

    return () => {
      newLenis.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <>
      {lenis && (
        <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
      )}
    </>
  );
};
