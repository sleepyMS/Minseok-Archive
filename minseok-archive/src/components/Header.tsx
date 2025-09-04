import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react"; // lucide-react 아이콘 import

// TODO: ThemeToggle 컴포넌트는 별도로 구현해야 합니다.
const ThemeToggle = () => {
  // 임시 플레이스홀더
  return <button className="w-8 h-8 bg-accent rounded-full"></button>;
};

const navLinks = [
  { title: "About", href: "#about" },
  { title: "Experience", href: "#experience" },
  { title: "Skills", href: "#skills" },
  { title: "Contact", href: "#contact" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 모바일 메뉴 애니메이션 Variants
  const mobileMenuVariants = {
    hidden: { opacity: 0, transition: { duration: 0.3 } },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, staggerChildren: 0.05 },
    },
  };

  const mobileLinkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${
          isScrolled
            ? "bg-primary/80 backdrop-blur-lg border-b border-default"
            : "bg-transparent"
        }`}
    >
      <div
        className={`container mx-auto px-6 flex justify-between items-center transition-all duration-300 ${
          isScrolled ? "py-3" : "py-4"
        }`}
      >
        {/* 로고 영역 (3D 오브젝트가 안착할 공간) */}
        <div
          id="logo-container"
          className="bg-secondary p-2 rounded-full flex items-center justify-center transition-all duration-300"
        >
          <span className="text-sm font-bold text-accent">DA</span>
        </div>

        {/* 데스크톱 네비게이션 */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              className="text-primary hover:text-accent-hover transition-colors duration-300"
            >
              {link.title}
            </a>
          ))}
          <ThemeToggle />
        </nav>

        {/* 모바일 메뉴 버튼 */}
        <div className="md:hidden flex items-center">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="ml-4 text-primary z-50"
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
            aria-label="메뉴 열기/닫기"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="md:hidden absolute top-0 left-0 w-full min-h-screen bg-primary/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center space-y-8">
              {navLinks.map((link) => (
                <motion.a
                  key={link.title}
                  href={link.href}
                  variants={mobileLinkVariants}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-semibold text-primary hover:text-accent-hover transition-colors duration-300"
                >
                  {link.title}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
