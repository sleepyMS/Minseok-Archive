import { Github } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  // 이 포트폴리오의 GitHub 저장소 주소
  const portfolioRepoUrl = "https://github.com/sleepyMS/Minseok-Archive"; // 본인 프로젝트 저장소 주소로 변경

  return (
    <footer className="border-t border-default bg-secondary">
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* 왼쪽: 저작권 정보 */}
          <div className="text-center sm:text-left">
            <p className="text-sm text-secondary">
              &copy; {currentYear} Minseok Choi. All Rights Reserved.
            </p>
          </div>

          {/* 오른쪽: 이 포트폴리오 소스 코드 링크 */}
          <div className="flex items-center">
            <a
              href={portfolioRepoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-secondary transition-colors duration-300 hover:text-accent"
              data-interactive
              data-cursor-text="View Source"
            >
              <Github size={16} />
              <span>View Project Source</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
