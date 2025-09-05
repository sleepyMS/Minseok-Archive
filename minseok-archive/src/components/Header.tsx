import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useLenisContext } from "../context/LenisContext";

const navLinks = [
  { title: "About", href: "#about" },
  { title: "Experience", href: "#experience" },
  { title: "Skills", href: "#skills" },
  { title: "Contact", href: "#contact" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lenis = useLenisContext();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 부드러운 스크롤을 위한 클릭 핸들러
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    lenis?.scrollTo(href, {
      offset: -80, // 헤더 높이만큼 오프셋을 주어 제목이 가려지지 않게 함
      duration: 1.5, // 스크롤 지속 시간
    });
    setIsMenuOpen(false); // 모바일 메뉴 닫기
  };

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
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.header
      initial={{ y: -15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 20,
        delay: 0.2,
        // 아래의 트랜지션을 추가하여 y와 opacity가 동시에 적용되도록 명시합니다.
        // 이 경우 y와 opacity에 각각 다른 transition을 적용할 수 있지만, spring 타입은 기본적으로 모든 값에 동일한 트랜지션을 적용합니다.
      }}
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
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-primary hover:text-accent-hover transition-colors duration-300"
              data-interactive
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
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              staggerChildren: 0.05,
            }}
            className="md:hidden absolute top-0 left-0 w-full min-h-screen bg-primary/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center space-y-8">
              {navLinks.map((link) => (
                <motion.a
                  key={link.title}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  variants={mobileLinkVariants}
                  className="text-2xl font-semibold text-primary hover:text-accent-hover transition-colors duration-300"
                >
                  {link.title}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
