// src/hooks/useTheme.tsx
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

// 테마 타입 정의: 'light' 또는 'dark'
type Theme = "light" | "dark";

// Context가 제공할 값의 타입 정의
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// ThemeContext 생성 (초기값은 undefined)
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ThemeProvider 컴포넌트 정의
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // localStorage에서 테마를 가져오거나, 없으면 'dark'를 기본값으로 설정
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem("theme");
    return (storedTheme as Theme) || "dark";
  });

  // 테마 변경 시 <html> 태그의 클래스와 localStorage 업데이트
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // 테마를 토글하는 함수
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// useTheme 커스텀 훅 정의
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
