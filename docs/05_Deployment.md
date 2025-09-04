# 5. 최적화 및 배포

이 문서는 'Minseok Archive' 프로젝트를 웹에 게시하기 전 최종적으로 점검하고, GitHub Pages를 통해 배포하는 과정을 안내합니다.

---

## 5.1. 배포 전 최종 점검 (Pre-deployment Checklist)

성공적인 배포와 최상의 사용자 경험을 위해 아래 항목들을 반드시 점검합니다.

### 5.1.1. 성능 최적화

- **이미지 에셋**: `assets` 폴더 내의 모든 이미지(JPG, PNG)를 `WebP`와 같은 최신 이미지 포맷으로 변환하여 용량을 최소화합니다. [Squoosh](https://squoosh.app/)와 같은 온라인 도구를 사용하면 좋습니다.
- **코드 스플리팅**: Vite는 기본적으로 경로 기반 코드 스플리팅을 잘 지원하지만, `React.lazy`와 `Suspense`를 사용하여 특정 무거운 컴포넌트(특히 3D 모델이나 무거운 라이브러리)가 필요할 때만 로드되도록 하여 초기 로딩 속도를 개선할 수 있습니다.
- ** Lighthouse 점검**: Chrome 개발자 도구의 Lighthouse 탭을 사용하여 Performance, Accessibility, SEO 등 전반적인 사이트 품질을 측정하고 개선점을 찾아 수정합니다.

### 5.1.2. 반응형 디자인 검수

- 다양한 디바이스 크기에서 레이아웃이 깨지지 않는지 확인합니다.
- Chrome 개발자 도구의 'Toggle device toolbar' 기능을 활용하여 모바일, 태블릿, 데스크톱 환경을 시뮬레이션하며 꼼꼼히 테스트합니다. 특히 터치 환경에서의 인터랙션(예: 호버 효과)이 어색하지 않은지 확인합니다.

---

## 5.2. GitHub Pages 배포

`gh-pages` 라이브러리를 사용하여 간단한 명령어로 프로젝트를 배포합니다.

### 5.2.1. `package.json` 파일 설정

`package.json` 파일을 열고 아래 두 가지 항목을 추가 및 수정합니다.

1.  **`homepage` 추가**: 배포될 웹사이트의 최종 URL을 최상단에 추가합니다.

    mmjson
    // "name": "your-portfolio", 바로 아랫줄 등에 추가
    "homepage": "https://{YOUR_GITHUB_ID}.github.io/{YOUR_REPO_NAME}",

    ```

    - `{YOUR_GITHUB_ID}`: 본인의 GitHub 아이디로 변경
    - `{YOUR_REPO_NAME}`: 이 프로젝트의 GitHub 저장소 이름으로 변경

    ```

2.  **`scripts` 수정**: 배포 관련 스크립트 두 줄을 추가합니다.

    mmjson
    "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
    },

    ```

    - `predeploy`: `deploy` 명령 실행 전 `build`를 먼저 실행하여 최신 빌드 파일을 생성합니다.
    - `deploy`: `build`를 통해 생성된 `dist` 폴더의 내용을 `gh-pages` 브랜치에 푸시합니다.
    ```

### 5.2.2. 배포 명령어 실행

터미널에서 아래 명령어를 실행하면 빌드와 배포가 순차적으로 자동 진행됩니다.

```bash
npm run deploy
```

### 5.2.3. GitHub 저장소 설정

1.  배포가 완료된 후, GitHub 프로젝트 저장소 페이지로 이동합니다.
2.  **Settings** 탭 > 왼쪽 메뉴의 **Pages**로 이동합니다.
3.  **Branch** 항목에서 소스 브랜치를 `main`이나 `master`가 아닌 **`gh-pages`**로 선택하고 **Save** 버튼을 누릅니다.

설정이 완료되면 잠시 후 `package.json`의 `homepage`에 기입했던 주소로 접속했을 때, 여러분의 포트폴리오 웹사이트가 성공적으로 게시된 것을 확인할 수 있습니다.
