import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Code, Terminal, BarChart2 } from "lucide-react";
import tddVisual from "/src/assets/tdd-visual.jpg";
import projectCover from "/src/assets/project-cover.jpg";
import contextApiVisual from "/src/assets/context-api-visual.png";
import ciCdVisual from "/src/assets/ci-cd-visual.jpg";
import storybookVisual from "/src/assets/storybook-visual.jpg";

// Completed data based on the internship experience documents
const experienceData = [
  {
    id: 1,
    date: "1주차",
    title: "TDD & React 기본 학습",
    description:
      "TDD 프로세스를 이해하고, React를 활용해 'shooking' 프로젝트의 상품 목록 페이지를 구현했습니다. Git과 GitHub 사용법, README 작성과 같은 협업 기본기를 다지는 데 집중했습니다.",
    visual: (
      <div className="w-full h-full bg-slate-800 rounded-lg flex flex-col items-center justify-center p-8 text-center text-white">
        <img
          src={tddVisual}
          alt="TDD 학습 및 상품 목록 페이지 구현"
          className="w-2/3 mb-4 rounded-md"
        />
        <p className="text-xl font-bold">상품 목록 페이지 구현</p>
        <p className="text-sm text-secondary-light">
          TDD를 통한 견고한 첫 코드
        </p>
      </div>
    ),
  },
  {
    id: 2,
    date: "2주차",
    title: "JEST 단위 테스트 & 무한 스크롤 구현",
    description:
      "상품 목록 페이지에 Jest를 활용한 단위 테스트를 적용하고, Intersection Observer API를 통해 무한 스크롤 기능을 구현하며 효율적인 사용자 경험 개선 방법을 습득했습니다. 기능 구현에 집중하여 렌더링 최적화는 다소 부족했습니다.",
    visual: (
      <div className="w-full h-full bg-slate-800 rounded-lg flex flex-col items-center justify-center p-8 text-center text-white">
        <img
          src={projectCover}
          alt="Jest와 무한 스크롤 구현"
          className="w-full mb-4 rounded-md"
        />
        <p className="text-xl font-bold">무한 스크롤 구현</p>
        <p className="text-sm text-secondary-light">
          사용자 경험을 고려한 UI 처리
        </p>
      </div>
    ),
  },
  {
    id: 3,
    date: "3주차",
    title: "결제 모듈 개발 & Context API",
    description:
      "고객 요구사항을 분석하여 결제 모듈을 구현하고, React Context API를 사용해 카드 목록과 같은 전역 상태를 효율적으로 관리했습니다. 하지만 복잡한 폼 로직의 예외 처리와 단위 테스트는 부족하여 아쉬움이 남았습니다.",
    visual: (
      <div className="w-full h-full bg-slate-800 rounded-lg flex flex-col items-center justify-center p-8 text-center text-white">
        <img
          src={contextApiVisual}
          alt="Context API를 활용한 결제 모듈"
          className="w-2/3 mb-4 rounded-md"
        />
        <p className="text-xl font-bold">결제 모듈 구현</p>
        <p className="text-sm text-secondary-light">
          Props drilling 없이 상태 관리
        </p>
      </div>
    ),
  },
  {
    id: 4,
    date: "5주차",
    title: "CI/CD & API Mocking",
    description:
      "CI/CD 파이프라인을 구축하여 배포를 자동화하고, Recoil을 활용한 상태 관리 및 API Mocking 실습을 진행했습니다. 회의 시 명확한 질문을 통해 필요한 정보를 확보하는 커뮤니케이션 스킬도 익혔습니다.",
    visual: (
      <div className="w-full h-full bg-slate-800 rounded-lg flex flex-col items-center justify-center p-8 text-center text-white">
        <img
          src={ciCdVisual}
          alt="CI/CD 파이프라인 시각화"
          className="w-2/3 mb-4 rounded-md"
        />
        <p className="text-xl font-bold">CI/CD & API</p>
        <p className="text-sm text-secondary-light">
          개발 자동화와 데이터 처리 경험
        </p>
      </div>
    ),
  },
  {
    id: 5,
    date: "6주차",
    title: "스토리북을 통한 문서화 및 협업",
    description:
      "스토리북을 프로젝트에 적용하여 컴포넌트를 독립적으로 개발하고 문서화했습니다. 이를 통해 협업 효율성을 높이는 방법을 배우고, 고객사 리뷰를 준비하며 실무 경험을 쌓았습니다.",
    visual: (
      <div className="w-full h-full bg-slate-800 rounded-lg flex flex-col items-center justify-center p-8 text-center text-white">
        <img
          src={storybookVisual}
          alt="스토리북 문서화"
          className="w-2/3 mb-4 rounded-md"
        />
        <p className="text-xl font-bold">스토리북 & 문서화</p>
        <p className="text-sm text-secondary-light">협업 프로세스 개선</p>
      </div>
    ),
  },
  {
    id: 6,
    date: "7주차",
    title: "React Router 적용 및 페이지 연동",
    description:
      "React Router를 활용하여 페이지 간 자연스러운 이동을 구현하고, 온라인 쇼핑몰 페이지들을 통합했습니다. 복잡한 페이지 연동 과정과 요구사항 분석을 통해 프로젝트 구조를 파악하는 능력을 키웠습니다.",
    visual: (
      <div className="w-full h-full bg-slate-800 rounded-lg flex flex-col items-center justify-center p-8 text-center text-white">
        <p className="text-xl font-bold">페이지 연동</p>
        <p className="text-sm text-secondary-light">
          매끄러운 사용자 경험 구현
        </p>
      </div>
    ),
  },
  {
    id: 7,
    date: "인턴십 완료",
    title: "성장하는 개발자로서의 다짐",
    description:
      "인턴십을 마무리하며 KPT 회고를 통해 코드 품질 개선, 폼 라이브러리 도입, 실제 API 연동 등 앞으로의 목표를 구체화했습니다. 이 경험을 발판 삼아 계속해서 배우고 성장하는 개발자가 되겠습니다.",
    visual: (
      <div className="w-full h-full bg-slate-800 rounded-lg flex flex-col items-center justify-center p-8 text-center text-white">
        <p className="text-xl font-bold">Next Step</p>
        <p className="text-sm text-secondary-light">
          지속적인 성장을 위한 계획
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
