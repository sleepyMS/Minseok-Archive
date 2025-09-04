// src/App.tsx
import CustomCursor from "./components/CustomCursor";
import Layout from "./components/Layout";
import { useTheme } from "./hooks/useTheme";

function App() {
  const { theme } = useTheme();

  return (
    <>
      <CustomCursor />
      <Layout>
        {/* 임시 콘텐츠: 나중에 각 섹션으로 교체됩니다. */}
        <div className="h-screen flex flex-col justify-center items-center pt-16">
          <h1 className="text-4xl font-bold text-violet-accent">
            Minseok Archive
          </h1>
          <p className="mt-4">커스텀 커서와 기본 레이아웃이 적용되었습니다.</p>
        </div>
        <div className="h-screen bg-primary-shadow flex justify-center items-center">
          <p>스크롤을 내려 다른 섹션을 확인하세요.</p>
        </div>
      </Layout>
    </>
  );
}

export default App;
