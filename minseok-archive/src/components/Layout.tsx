// src/components/Layout.tsx - 수정 후

import type { ReactNode } from "react";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    // ✅ 여기에 Tailwind 클래스를 적용하면 됩니다.
    <div className="min-h-screen bg-primary text-primary">
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
