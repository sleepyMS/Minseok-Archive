import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Sample data for the timeline
const experienceData = [
  {
    id: 1,
    date: "2024 - Present",
    title: "Frontend Developer at ExampleCorp",
    description:
      "Developed and maintained user-facing features using React and TypeScript, improving component reusability and performance.",
    visual: (
      <div className="w-full h-full bg-blue-500 rounded-lg flex items-center justify-center">
        <p className="text-white text-2xl">Visual for Job 1</p>
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
      <div className="w-full h-full bg-green-500 rounded-lg flex items-center justify-center">
        <p className="text-white text-2xl">Visual for Job 2</p>
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
      <div className="w-full h-full bg-purple-500 rounded-lg flex items-center justify-center">
        <p className="text-white text-2xl">Visual for Project</p>
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
      <div className="w-full h-full bg-red-500 rounded-lg flex items-center justify-center">
        <p className="text-white text-2xl">Visual for Graduation</p>
      </div>
    ),
  },
];

const Experience = () => {
  const [activeId, setActiveId] = useState(experienceData[0].id);

  return (
    <section id="experience" className="container mx-auto px-6 py-24">
      <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12">
        My Journey
      </h2>
      <div className="flex flex-col md:flex-row gap-16">
        {/* Left Panel: Scrollable Timeline */}
        <div className="md:w-1/2">
          <div className="space-y-24">
            {experienceData.map((item) => (
              <motion.div
                key={item.id}
                className="p-4 rounded-lg"
                onViewportEnter={() => setActiveId(item.id)}
                // This ensures the element is fully in view before triggering
                viewport={{ amount: 0.8 }}
              >
                <p className="text-sm text-secondary mb-2">{item.date}</p>
                <h3 className="text-xl font-bold text-accent mb-3">
                  {item.title}
                </h3>
                <p className="text-secondary leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Panel: Sticky Visuals */}
        <div className="hidden md:block md:w-1/2 h-[500px] sticky top-24">
          <AnimatePresence mode="wait">
            {experienceData.map(
              (item) =>
                item.id === activeId && (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
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
