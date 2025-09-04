// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // 다크/라이트 모드 전환을 위해 추가
  theme: {
    extend: {
      // 여기에 우리만의 커스텀 디자인을 추가합니다.
      colors: {
        background: "#120E18",
        "primary-text": "#EAE6F0",
        "violet-accent": "#8A2BE2",
        "lavender-secondary": "#C77DFF",
      },
    },
  },
  plugins: [],
};
