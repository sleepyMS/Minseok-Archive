// src/components/ThemeToggle.tsx
import { useTheme } from "../hooks/useTheme";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-primary text-primary hover:bg-secondary transition-colors"
    >
      {/* 2. 현재 테마에 따라 적절한 아이콘을 보여줍니다. */}
      {theme === "light" ? (
        <Moon size={24} /> // 라이트 모드일 때는 Moon 아이콘
      ) : (
        <Sun size={24} /> // 다크 모드일 때는 Sun 아이콘
      )}
    </button>
  );
};

export default ThemeToggle;
