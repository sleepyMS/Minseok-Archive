import Layout from "./components/Layout";
import SEO from "./components/SEO"; // import 추가
import { ThemeProvider } from "./hooks/useTheme";
import { CursorProvider } from "./hooks/useCustomCursor"; // CursorProvider import
import Hero from "./sections/Hero";
import Experience from "./sections/Experience";
import SkillsSection from "./sections/Skills";
import Contact from "./sections/Contact";
import About from "./sections/About";
import { LenisProvider } from "./components/providers/LenisProvider";

function App() {
  return (
    <>
      <SEO /> {/* This now works directly! */}
      <ThemeProvider>
        <CursorProvider>
          <LenisProvider>
            <Layout>
              <Hero />
              <About />
              <Experience />
              <SkillsSection />
              <Contact />
            </Layout>
          </LenisProvider>
        </CursorProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
