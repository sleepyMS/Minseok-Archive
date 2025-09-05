// src/sections/About.tsx

import { motion } from "framer-motion";
import { Lightbulb, Code, Users } from "lucide-react";
import profileData from "../data/profileData.json";
import ProfileCard from "../components/ProfileCard";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
} as const;

const leftColumnVariants = {
  hidden: { opacity: 0, x: -30 }, // 왼쪽(-50)에서 시작
  visible: {
    opacity: 1,
    x: 0, // 최종 위치(0)로 이동
    transition: { duration: 0.3, ease: "easeOut" },
  },
} as const;

const rightColumnVariants = {
  hidden: { opacity: 0, x: 30 }, // 오른쪽(50)에서 시작
  visible: {
    opacity: 1,
    x: 0, // 최종 위치(0)로 이동
    transition: { duration: 0.5, ease: "easeOut" },
  },
} as const;

const About = () => {
  return (
    <section
      id="about"
      className="container mx-auto px-6 py-24 overflow-hidden"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="grid md:grid-cols-5 gap-12 items-start"
      >
        <motion.div
          variants={leftColumnVariants}
          className="md:col-span-2 sticky top-24"
        >
          <ProfileCard data={profileData} />
        </motion.div>

        <motion.div variants={rightColumnVariants} className="md:col-span-3">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            About Me: The Digital Craftsman
          </h2>

          <p className="text-secondary text-lg leading-relaxed mb-6">
            From building worlds with blocks as a child, I now construct digital
            experiences with code. I find immense joy not just in making things
            work, but in crafting interfaces that are a delight to see and use.
          </p>
          <p className="text-secondary leading-relaxed mb-8">
            My experience at **InternINMeta** was pivotal, teaching me the value
            of collaboration in solving complex problems and building superior
            products alongside brilliant colleagues.
          </p>

          {/* Core Values */}
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-secondary rounded-full text-accent">
                <Lightbulb size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-primary">
                  Creative Problem-Solving
                </h4>
                <p className="text-sm text-secondary">
                  I explore creative solutions for a better user experience
                  rather than just following the beaten path.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-secondary rounded-full text-accent">
                <Code size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-primary">
                  Clean & Robust Code
                </h4>
                <p className="text-sm text-secondary">
                  I aim to write code that is easy for future colleagues to
                  understand and maintain.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-secondary rounded-full text-accent">
                <Users size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-primary">
                  Communication & Collaboration
                </h4>
                <p className="text-sm text-secondary">
                  I believe the best products emerge from transparent
                  communication and close teamwork.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
