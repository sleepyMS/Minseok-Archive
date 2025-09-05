import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 전역 컴포넌트 Import
import Header from "./Header";
import CustomCursor from "./CustomCursor";
import SkipToContent from "./SkipToContent";
import Footer from "./Footer";
import AnimatedBackground from "./AnimatedBackground";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      {/* 2. 웹 접근성을 위한 '본문 바로가기' 컴포넌트 */}
      <SkipToContent />

      {/* 3. 커스텀 마우스 커서 컴포넌트 */}
      <CustomCursor />

      <div className="fixed inset-0 -z-10 overflow-hidden bg-primary">
        <AnimatedBackground />
      </div>

      <div className="min-h-screen bg-transparent text-primary">
        <Header />
        {/* 4. 페이지 진입 및 전환 애니메이션 */}
        <AnimatePresence mode="wait">
          <motion.main
            id="main-content" // SkipToContent의 타겟 ID
            key={location.pathname} // (SPA에서 페이지 이동 시 애니메이션을 위함)
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {children}
          </motion.main>
        </AnimatePresence>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
