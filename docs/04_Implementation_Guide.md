# 4. 컴포넌트별 구현 가이드

이 문서는 `docs/3_Feature_Specifications.md`에서 정의된 각 핵심 기능들을 실제 코드로 구현하기 위한 상세 가이드입니다.

---

## 4.1. 섹션 1: Hero (`sections/Hero.tsx`)

### 4.1.1. 컴포넌트 위치

- `src/sections/Hero.tsx`
- `src/components/canvas/Crystal.tsx` (3D 오브젝트 컴포넌트)

### 4.1.2. 핵심 로직

1.  **3D 오브젝트 렌더링**:

    - `Hero.tsx` 내부에 `@react-three/fiber`의 `<Canvas>` 컴포넌트를 배치하여 3D 렌더링 영역을 설정합니다.
    - 실제 3D 모델(예: Crystal)은 별도의 컴포넌트로 분리하여 `<Canvas>` 내부에서 호출합니다. 이는 `Hero.tsx`의 코드 복잡도를 낮추고 3D 관련 로직을 분리하는 데 도움이 됩니다.
    - `@react-three/drei`의 `<OrbitControls>`나 커스텀 로직을 사용하여 마우스 움직임에 오브젝트가 반응하도록 구현합니다.

2.  **테마 연동 재질 변경**:

    - `useTheme` 커스텀 훅을 사용하여 현재 테마(`'dark'` 또는 `'light'`) 값을 가져옵니다.
    - `Framer Motion`의 `useAnimate` 훅이나 `react-spring`을 사용하여 테마 값이 변경될 때 `<MeshStandardMaterial>`의 `metalness`와 `roughness` 속성값을 부드럽게 애니메이션 처리합니다.

    ```jsx
    // 예시: Crystal.tsx 내부
    const { theme } = useTheme();
    const materialRef = useRef();

    useEffect(() => {
      // theme 값에 따라 materialRef.current의 속성을 애니메이션
    }, [theme]);
    ```

3.  **스크롤 연동 애니메이션**:
    - `<Canvas>` 컴포넌트를 `motion.div`로 감쌉니다.
    - `Framer Motion`의 `useScroll` 훅을 사용하여 `scrollYProgress` 값을 추적합니다.
    - `useTransform` 훅을 사용하여 `scrollYProgress` 값(예: `[0, 0.1]`)을 `scale`, `x`, `y` 값으로 각각 매핑합니다.
    - 매핑된 값들을 `motion.div`의 `style` 프롭에 전달하여 스크롤에 따라 캔버스의 크기와 위치가 변경되도록 합니다.

---

## 4.2. 섹션 2: Experience (`sections/Experience.tsx`)

### 4.2.1. 컴포넌트 위치

- `src/sections/Experience.tsx`

### 4.2.2. 핵심 로직

1.  **레이아웃 구성**:

    - 최상위 컨테이너를 `flex` 또는 `grid`를 사용하여 좌우 2단으로 분할합니다.
    - 오른쪽 패널에 `position: sticky`와 `top: 0` 속성을 부여하여 화면 상단에 고정시킵니다.

2.  **활성 항목 상태 관리**:

    - 현재 화면에 보여줄 시각 자료를 결정하기 위해 `useState`를 사용하여 활성 항목의 ID를 저장합니다. `const [activeCardId, setActiveCardId] = useState(null);`

3.  **스크롤에 따른 상태 변경**:

    - 왼쪽 패널의 각 항목을 `motion.div`로 감싸고 `onViewportEnter` 프롭을 사용합니다.
    - 항목이 뷰포트에 들어올 때, 해당 항목의 고유 ID로 `setActiveCardId`를 호출하여 상태를 업데이트합니다.

    ```jsx
    // 예시: 왼쪽 패널의 map 함수 내부
    {
      items.map((item) => (
        <motion.div
          key={item.id}
          onViewportEnter={() => setActiveCardId(item.id)}
          // ...
        >
          <h3>{item.title}</h3>
        </motion.div>
      ));
    }
    ```

4.  **시각 자료 동적 렌더링**:
    - 오른쪽 패널에서는 `activeCardId` 상태값을 기반으로 적절한 이미지나 컴포넌트를 렌더링합니다.
    - `Framer Motion`의 `<AnimatePresence>` 컴포넌트로 시각 자료를 감싸, `activeCardId`가 변경될 때마다 부드러운 전환(Fade, Slide 등) 애니메이션이 발생하도록 합니다.

---

## 4.3. 섹션 3: Skills (`sections/Skills.tsx`)

### 4.3.1. 컴포넌트 위치

- `src/sections/Skills.tsx`
- `src/components/modals/SkillDetailModal.tsx`

### 4.3.2. 핵심 로직

1.  **데이터 구조화**:

    - `React Flow`가 요구하는 형식에 맞게 스킬(Nodes)과 관계(Edges) 데이터를 배열로 정의합니다.

2.  **그래프 렌더링**:

    - `ReactFlow` 컴포넌트를 렌더링하고, `nodes`와 `edges` 상태를 프롭으로 전달합니다.
    - 기본적인 확대/축소/이동(Pan & Zoom) 기능을 비활성화하여 고정된 뷰를 제공할 수 있습니다.

3.  **인터랙션 구현**:
    - `onNodeMouseEnter`, `onNodeMouseLeave` 프롭을 사용하여 마우스 호버 시 연결된 노드와 엣지의 스타일(예: 색상, 두께)을 동적으로 변경하는 핸들러 함수를 구현합니다.
    - `onNodeClick` 프롭을 사용하여 노드 클릭 시 해당 스킬의 상세 정보를 담은 모달(`SkillDetailModal`)을 띄웁니다. 모달의 열림/닫힘 상태는 `useState`로 관리합니다.
