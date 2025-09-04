# 1. 프로젝트 설정 및 환경 구성

이 문서에서는 'Minseok Archive' 프로젝트 개발을 위한 초기 환경 설정 과정을 안내합니다.

---

## 1.1. 사전 준비: Node.js

개발을 시작하기 전, PC에 **Node.js**가 설치되어 있어야 합니다. 터미널(PowerShell, Terminal 등)을 열고 아래 명령어로 버전을 확인하세요. `v18.0.0` 이상의 버전 사용을 권장합니다.

```bash
node -v
```

만약 Node.js가 설치되어 있지 않다면, [Node.js 공식 웹사이트](https://nodejs.org/ko)에서 LTS 버전을 다운로드하여 설치해 주세요.

---

## 1.2. 프로젝트 생성 (Vite & TypeScript)

최신 개발 환경인 Vite를 사용하여 React와 TypeScript 기반의 프로젝트를 시작합니다. 원하는 경로에서 아래 명령어를 실행하세요.

```bash
# 'your-portfolio' 부분은 원하는 프로젝트 이름으로 변경하세요.
npm create vite@latest your-portfolio -- --template react-ts

# 생성된 프로젝트 폴더로 이동합니다.
cd your-portfolio
```

---

## 1.3. 핵심 라이브러리 설치

프로젝트에 필요한 모든 라이브러리를 설치합니다.

### 1.3.1. 기본 의존성 설치

`npm install` 명령어를 실행하여 React와 같은 프로젝트의 기본 패키지를 설치합니다.

```bash
npm install
```

### 1.3.2. 추가 라이브러리 설치

스타일링, 애니메이션, 3D 그래픽 등 프로젝트의 핵심 기능을 담당할 라이브러리들을 설치합니다.

```bash
# 스타일링 (Tailwind CSS v4 + Vite Plugin)
npm install -D @tailwindcss/vite tailwindcss postcss autoprefixer

# 애니메이션
npm install framer-motion

# 3D 그래픽
npm install three @react-three/fiber @react-three/drei

# 부드러운 스크롤
npm install lenis

# GitHub Pages 배포용
npm install -D gh-pages
```

---

## 1.4. Tailwind CSS 설정 (v4 기준)

1.  **`vite.config.ts` 파일 수정:**
    프로젝트 루트에 있는 `vite.config.ts` 파일을 열고, `@tailwindcss/vite` 플러그인을 추가합니다.

    ```typescript
    // vite.config.ts
    import { defineConfig } from "vite";
    import react from "@vitejs/plugin-react";
    import tailwindcss from "@tailwindcss/vite"; // 1. import 추가

    // https://vitejs.dev/config/
    export default defineConfig({
      plugins: [react(), tailwindcss()], // 2. 여기에 추가
    });
    ```

2.  **`tailwind.config.js` 파일 수동 생성:**
    프로젝트 루트에 `tailwind.config.js` 파일을 직접 생성하고, 아래 내용을 채워 넣어 커스텀 디자인 시스템을 정의합니다.

    ```javascript
    // tailwind.config.js
    /** @type {import('tailwindcss').Config} */
    export default {
      content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
      darkMode: "class",
      theme: {
        extend: {
          colors: {
            background: "#120E18",
            "primary-text": "#EAE6F0",
            "violet-accent": "#8A2BE2",
            "lavender-secondary": "#C77DFF",
            "primary-shadow": "#2A2135",
          },
        },
      },
      plugins: [],
    };
    ```

3.  **`src/index.css` 파일 수정:**
    `src/index.css` 파일의 **기존 내용을 모두 삭제**하고, 아래의 Tailwind CSS 기본 지시문을 추가합니다.

    ```css
    /* src/index.css */
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

---

## 1.5. 설정 확인

모든 설정이 완료되었습니다. 아래 명령어로 개발 서버를 실행하여 모든 것이 정상적으로 작동하는지 확인합니다.

```bash
npm run dev
```

웹 브라우저에서 `http://localhost:5173/` 주소로 접속한 뒤, `src/App.tsx` 파일을 수정하여 Tailwind CSS 클래스가 적용되는지 테스트해 보세요.
