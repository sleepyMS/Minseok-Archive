import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCustomCursor } from "../hooks/useCustomCursor";

const sizeVariants = {
  small: { width: 24, height: 24 },
  medium: { width: 40, height: 40 },
  large: { width: 60, height: 60 },
};

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { size, text, isHovering, setCursorStyle } = useCustomCursor();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      const interactiveElement = target.closest(
        "a, button, [data-interactive]"
      );

      setCursorStyle({
        isHovering: !!interactiveElement,
        size:
          (interactiveElement?.getAttribute("data-cursor-size") as
            | "medium"
            | "large") || "medium",
        text: interactiveElement?.getAttribute("data-cursor-text") || "",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [setCursorStyle]);

  return (
    <motion.div
      className="fixed z-[999] pointer-events-none rounded-full bg-accent flex items-center justify-center"
      style={{
        left: position.x,
        top: position.y,
        translateX: "-50%",
        translateY: "-50%",
      }}
      variants={sizeVariants}
      animate={isHovering ? size : "small"}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      {isHovering && text && (
        <span className="text-xs text-primary font-semibold">{text}</span>
      )}
    </motion.div>
  );
};

export default CustomCursor;
