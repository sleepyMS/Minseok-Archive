// src/sections/Experience.tsx

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Sample data (기존과 동일)
const experienceData = [
  {
    id: 1,
    date: "2024 - Present",
    title: "Frontend Developer at ExampleCorp",
    description:
      "Developed and maintained user-facing features using React and TypeScript, improving component reusability and performance.",
    visual: (
      <div className="w-full h-full bg-blue-500 rounded-lg flex items-center justify-center p-8">
        <p className="text-white text-3xl font-bold shadow-lg">
          Visual for Job 1
        </p>
      </div>
    ),
  },
  {
    id: 2,
    date: "2022 - 2024",
    title: "Intern at Tech Solutions",
    description:
      "Assisted the development team in building interactive UIs and participated in the full software development lifecycle.",
    visual: (
      <div className="w-full h-full bg-green-500 rounded-lg flex items-center justify-center p-8">
        <p className="text-white text-3xl font-bold shadow-lg">
          Visual for Job 2
        </p>
      </div>
    ),
  },
  {
    id: 3,
    date: "2021",
    title: 'Personal Project: "GraphiQL"',
    description:
      "Created a data visualization tool using D3.js and React, allowing users to create and customize various chart types.",
    visual: (
      <div className="w-full h-full bg-purple-500 rounded-lg flex items-center justify-center p-8">
        <p className="text-white text-3xl font-bold shadow-lg">
          Visual for Project
        </p>
      </div>
    ),
  },
  {
    id: 4,
    date: "2020",
    title: "Computer Science Graduate",
    description:
      "Graduated with a focus on Human-Computer Interaction and web development principles.",
    visual: (
      <div className="w-full h-full bg-red-500 rounded-lg flex items-center justify-center p-8">
        <p className="text-white text-3xl font-bold shadow-lg">
          Visual for Graduation
        </p>
      </div>
    ),
  },
];

const Experience = () => {
  const [activeId, setActiveId] = useState(experienceData[0].id);

  return (
    <section id="experience" className="container mx-auto px-6 py-24">
      <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">
        My Journey
      </h2>
      <div className="flex flex-col md:flex-row gap-16">
        {/* Left Panel: Scrollable Timeline */}
        <div className="md:w-1/2">
          {/* ⭐️ 핵심 1: space-y-24 클래스를 제거합니다. 간격은 아래에서 직접 제어합니다. */}
          <div>
            {experienceData.map((item) => (
              <motion.div
                key={item.id}
                // ⭐️ 핵심 2: 각 아이템이 최소한 화면 높이(min-h-screen)만큼의 공간을 차지하도록 설정합니다.
                // 이렇게 하면 한 화면에 하나의 아이템만 들어오게 됩니다.
                className="min-h-screen flex flex-col justify-center"
                onViewportEnter={() => setActiveId(item.id)}
                // ⭐️ 핵심 3: 아이템의 '중앙'이 화면의 '중앙'을 지날 때 활성화되도록 amount를 0.5로 변경합니다.
                // 이 설정이 훨씬 더 직관적이고 정확합니다.
                viewport={{ amount: 0.5 }}
              >
                <div className="p-4 rounded-lg">
                  <p className="text-sm text-secondary mb-2">{item.date}</p>
                  <h3 className="text-2xl font-bold text-accent mb-3">
                    {item.title}
                  </h3>
                  <p className="text-secondary leading-relaxed max-w-lg">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Panel: Sticky Visuals (기존과 동일) */}
        <div className="hidden md:block md:w-1/2 h-[500px] sticky top-24">
          <AnimatePresence mode="wait">
            {experienceData.map(
              (item) =>
                item.id === activeId && (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-full h-full"
                  >
                    {item.visual}
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Experience;
