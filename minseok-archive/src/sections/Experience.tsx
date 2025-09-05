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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* 왼쪽 패널: 스크롤 가능한 타임라인 */}
        <div className="md:col-span-1">
          <div>
            {experienceData.map((item) => (
              <motion.div
                key={item.id}
                className="min-h-[80vh] flex flex-col justify-center"
                onViewportEnter={() => setActiveId(item.id)}
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

        {/* 오른쪽 패널: 고정(Sticky)되는 시각 자료 및 타이틀 */}
        <div className="hidden md:block md:col-span-1">
          <div className="sticky top-24">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12">
              My Journey
            </h2>

            {/* 시각 자료 패널 */}
            <div className="h-[500px]">
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
        </div>
      </div>
    </section>
  );
};

export default Experience;
