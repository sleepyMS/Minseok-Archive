// src/components/CustomCursor.tsx
import { useCustomCursor } from "../hooks/useCustomCursor";

const CustomCursor = () => {
  const { x, y } = useCustomCursor();

  return (
    <div
      className="fixed top-0 left-0 w-6 h-6 bg-primary rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 mix-blend-difference z-50"
      style={{
        transform: `translate3d(${x}px, ${y}px, 0)`,
      }}
    />
  );
};

export default CustomCursor;
