import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";

// 커서의 다양한 상태를 정의
type CursorStyle = {
  size: "small" | "medium" | "large";
  text: string;
  isHovering: boolean;
};

interface CursorContextType extends CursorStyle {
  setCursorStyle: (style: Partial<CursorStyle>) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider = ({ children }: { children: ReactNode }) => {
  const [style, setStyle] = useState<CursorStyle>({
    size: "small",
    text: "",
    isHovering: false,
  });

  const setCursorStyle = useCallback((newStyle: Partial<CursorStyle>) => {
    setStyle((prevStyle) => ({ ...prevStyle, ...newStyle }));
  }, []);

  return (
    <CursorContext.Provider value={{ ...style, setCursorStyle }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCustomCursor = () => {
  const context = useContext(CursorContext);
  if (context === undefined) {
    throw new Error("useCustomCursor must be used within a CursorProvider");
  }
  return context;
};
