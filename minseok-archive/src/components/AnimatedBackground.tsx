import React, { type JSX } from "react";

const floatingColors = [
  "rgba(var(--primary-rgb), 0.35)",
  "rgba(var(--accent-rgb), 0.4)",
  "rgba(179, 229, 252, 0.3)",
  "rgba(255, 204, 255, 0.35)",
];

function getRandom(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function createFloatingElements(
  count: number,
  isBlob: boolean = false
): JSX.Element[] {
  const elements: JSX.Element[] = [];
  for (let i = 0; i < count; i++) {
    const size = isBlob ? getRandom(250, 600) : getRandom(60, 120); // 블롭과 원의 크기 범위 조절
    const x = getRandom(-10, 110);
    const y = getRandom(-10, 110);
    const color =
      floatingColors[Math.floor(Math.random() * floatingColors.length)];
    const duration = getRandom(25, 45); // 애니메이션 지속 시간
    const delay = getRandom(0, 25); // 딜레이 범위
    const direction = Math.random() > 0.5 ? "normal" : "reverse";
    const opacity = isBlob ? getRandom(0.3, 0.5) : getRandom(0.4, 0.6); // 블롭/원의 투명도

    let blurClass = "";
    if (isBlob) {
      blurClass = "blur-3xl";
    } else {
      // 작은 원 중 일부는 블러 없이, 일부는 약하게 블러 적용
      if (Math.random() < 0.4) {
        // 40% 확률로 블러 없음
        blurClass = "";
      } else {
        blurClass = "blur-sm"; // 나머지 60%는 약하게 블러 적용
      }
    }

    elements.push(
      <div
        key={`${isBlob ? "blob" : "circle"}-${i}`}
        className={`absolute rounded-full ${blurClass}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: color,
          top: `${y}%`,
          left: `${x}%`,
          animation: `float ${duration}s ease-in-out infinite ${delay}s ${direction}`,
          opacity: opacity,
          willChange: "transform",
        }}
      />
    );
  }
  return elements;
}

const AnimatedBackground = () => {
  const floatingCircles = React.useMemo(
    () => createFloatingElements(10, false),
    []
  );
  const floatingBlobs = React.useMemo(
    () => createFloatingElements(5, true),
    []
  );

  return (
    <>
      {floatingCircles}
      {floatingBlobs}
    </>
  );
};

export default React.memo(AnimatedBackground);
