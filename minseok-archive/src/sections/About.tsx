import { motion } from "framer-motion";
import { Lightbulb, Code, Users } from "lucide-react";

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
} as const; // Add 'as const' here

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
} as const; // And also here

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
        className="grid md:grid-cols-5 gap-12 items-center"
      >
        {/* 1. Profile Image Area */}
        <motion.div variants={itemVariants} className="md:col-span-2">
          <div className="relative p-2 border-2 border-accent rounded-xl shadow-lg shadow-accent/20">
            <div className="bg-secondary rounded-lg p-4">
              {/* TODO: Replace with your profile image. */}
              <img
                src="https://via.placeholder.com/400"
                alt="Minseok Choi's Profile"
                className="w-full h-auto rounded-md object-cover"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-accent rounded-full flex items-center justify-center text-primary font-bold text-xl shadow-md">
              M
            </div>
          </div>
        </motion.div>

        {/* 2. Text Content Area */}
        <motion.div variants={itemVariants} className="md:col-span-3">
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

          {/* 3. Core Values */}
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
