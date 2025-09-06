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
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0, // 최종 위치(0)로 이동
    transition: { duration: 0.3, ease: "easeOut" },
  },
} as const;

const rightColumnVariants = {
  hidden: { opacity: 0, x: 30 },
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
            About Me: 성장을 주도하는 개발자
          </h2>

          <p className="text-secondary text-lg leading-relaxed mb-6">
            어릴 적 블록으로 세상을 만들던 즐거움이 이제는 코드로 디지털 경험을
            구축하는 즐거움이 되었습니다. 저는 단순히 기능을 구현하는 것을 넘어,
            사용자에게 즐거움을 선사하는 인터페이스를 만드는 데 가치를 둡니다.
          </p>
          <p className="text-secondary leading-relaxed mb-8">
            <b>인턴IN메타</b>에서의 경험은 제게 복잡한 문제를 해결하고 우수한
            프로덕트를 만들기 위해 <b>동료들과 협업하는 가치</b>를 깊이 깨닫게
            해준 소중한 시간이었습니다.
          </p>

          {/* Core Values */}
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-secondary rounded-full text-accent">
                <Lightbulb size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-primary">
                  탐구하는 문제 해결
                </h4>
                <p className="text-sm text-secondary">
                  `shooking` 프로젝트의 무한 스크롤 테스트와 같은 난관을
                  탐구하여 창의적이고 실질적인 해결책을 찾아냅니다.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-secondary rounded-full text-accent">
                <Code size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-primary">
                  클린하고 견고한 코드
                </h4>
                <p className="text-sm text-secondary">
                  미래의 동료들을 위해 유지보수가 용이하고 안정적인 코드를
                  작성하는 것을 목표로 합니다.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-secondary rounded-full text-accent">
                <Users size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-primary">
                  투명한 소통과 협업
                </h4>
                <p className="text-sm text-secondary">
                  모든 팀원과 적극적으로 의견을 나누고, 투명한 소통을 통해
                  최상의 결과를 도출한다고 믿습니다.
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
