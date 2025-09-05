import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-10 h-10 rounded-full bg-primary-shadow/50 border border-primary-shadow text-primary transition-colors duration-300 hover:bg-violet-accent/10"
      aria-label="Toggle dark and light theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.div
            key="moon"
            initial={{ rotate: 360, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: -360, scale: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute"
          >
            <Moon size={20} />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 360, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: -360, scale: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute"
          >
            <Sun size={20} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
