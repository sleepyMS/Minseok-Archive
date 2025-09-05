// src/sections/Skills.tsx

import { useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import type { Connection, Edge, Node } from "reactflow";
import "reactflow/dist/style.css";

// --- Data for the Final, Zoned Skill Map ---
const initialNodes: Node[] = [
  // SECTION: Parent Groups (Zones)
  {
    id: "zone-frontend",
    data: { label: "Frontend" },
    position: { x: -700, y: -250 },
    className: "light",
    style: {
      backgroundColor: "rgba(97, 218, 251, 0.1)",
      width: 450,
      height: 600,
    },
    type: "group",
  },
  {
    id: "zone-backend-python",
    data: { label: "Backend (Python)" },
    position: { x: -200, y: -50 },
    className: "light",
    style: {
      backgroundColor: "rgba(76, 175, 80, 0.1)",
      width: 400,
      height: 250,
    },
    type: "group",
  },
  {
    id: "zone-backend-java",
    data: { label: "Backend (Java)" },
    position: { x: -200, y: 250 },
    className: "light",
    style: {
      backgroundColor: "rgba(248, 150, 32, 0.1)",
      width: 400,
      height: 150,
    },
    type: "group",
  },
  {
    id: "zone-devops",
    data: { label: "DevOps & Cloud" },
    position: { x: 250, y: -200 },
    className: "light",
    style: {
      backgroundColor: "rgba(240, 80, 50, 0.1)",
      width: 400,
      height: 350,
    },
    type: "group",
  },
  {
    id: "zone-db",
    data: { label: "Database" },
    position: { x: 250, y: 200 },
    className: "light",
    style: {
      backgroundColor: "rgba(51, 103, 145, 0.1)",
      width: 400,
      height: 200,
    },
    type: "group",
  },

  // SECTION: Frontend Nodes
  {
    id: "nextjs",
    data: { label: "Next.js" },
    position: { x: 50, y: 50 },
    parentNode: "zone-frontend",
    style: {
      backgroundColor: "#000000",
      color: "#FFFFFF",
      border: "1px solid #333",
    },
  },
  {
    id: "react",
    data: { label: "React" },
    position: { x: 250, y: 50 },
    parentNode: "zone-frontend",
    style: {
      backgroundColor: "#61DAFB",
      color: "#000000",
      border: "1px solid #00C2EE",
    },
  },
  {
    id: "typescript",
    data: { label: "TypeScript" },
    position: { x: 50, y: 150 },
    parentNode: "zone-frontend",
  },
  {
    id: "zustand",
    data: { label: "Zustand" },
    position: { x: 250, y: 150 },
    parentNode: "zone-frontend",
  },
  {
    id: "tanstack-query",
    data: { label: "TanStack Query" },
    position: { x: 50, y: 250 },
    parentNode: "zone-frontend",
  },
  {
    id: "tailwind",
    data: { label: "Tailwind CSS" },
    position: { x: 250, y: 250 },
    parentNode: "zone-frontend",
  },
  {
    id: "framer",
    data: { label: "Framer Motion" },
    position: { x: 50, y: 350 },
    parentNode: "zone-frontend",
  },
  {
    id: "three",
    data: { label: "Three.js / R3F" },
    position: { x: 250, y: 350 },
    parentNode: "zone-frontend",
  },
  {
    id: "vite",
    data: { label: "Vite" },
    position: { x: 150, y: 500 },
    parentNode: "zone-frontend",
  },

  // SECTION: Backend (Python) Nodes
  {
    id: "fastapi",
    data: { label: "FastAPI" },
    position: { x: 50, y: 50 },
    parentNode: "zone-backend-python",
    style: {
      backgroundColor: "#009688",
      color: "#FFFFFF",
      border: "1px solid #00796B",
    },
  },
  {
    id: "python",
    data: { label: "Python" },
    position: { x: 250, y: 50 },
    parentNode: "zone-backend-python",
  },
  {
    id: "celery",
    data: { label: "Celery & Redis" },
    position: { x: 50, y: 150 },
    parentNode: "zone-backend-python",
  },
  {
    id: "sqlalchemy",
    data: { label: "SQLAlchemy" },
    position: { x: 250, y: 150 },
    parentNode: "zone-backend-python",
  },

  // SECTION: Backend (Java) Nodes
  {
    id: "springboot",
    data: { label: "Spring Boot" },
    position: { x: 50, y: 50 },
    parentNode: "zone-backend-java",
    style: {
      backgroundColor: "#6DB33F",
      color: "#FFFFFF",
      border: "1px solid #5C9A33",
    },
  },
  {
    id: "java",
    data: { label: "Java" },
    position: { x: 250, y: 50 },
    parentNode: "zone-backend-java",
  },

  // SECTION: DevOps & Cloud Nodes
  {
    id: "aws",
    data: { label: "AWS" },
    position: { x: 125, y: 50 },
    parentNode: "zone-devops",
    type: "output",
  },
  {
    id: "docker",
    data: { label: "Docker" },
    position: { x: 50, y: 150 },
    parentNode: "zone-devops",
  },
  {
    id: "github-actions",
    data: { label: "GitHub Actions" },
    position: { x: 200, y: 150 },
    parentNode: "zone-devops",
  },
  {
    id: "git",
    data: { label: "Git & GitHub" },
    position: { x: 125, y: 250 },
    parentNode: "zone-devops",
  },

  // SECTION: Database Nodes
  {
    id: "postgresql",
    data: { label: "PostgreSQL" },
    position: { x: 50, y: 75 },
    parentNode: "zone-db",
  },
  {
    id: "mysql",
    data: { label: "MySQL" },
    position: { x: 250, y: 75 },
    parentNode: "zone-db",
  },
];

const initialEdges: Edge[] = [
  // Frontend internal connections
  { id: "e-next-react", source: "nextjs", target: "react", animated: true },
  { id: "e-react-ts", source: "react", target: "typescript" },
  {
    id: "e-react-framer",
    source: "react",
    target: "framer",
    label: "Animation",
  },
  { id: "e-react-three", source: "react", target: "three", label: "3D" },
  // Backend internal connections
  {
    id: "e-fastapi-python",
    source: "fastapi",
    target: "python",
    animated: true,
  },
  {
    id: "e-springboot-java",
    source: "springboot",
    target: "java",
    animated: true,
  },
  // DevOps internal connections
  {
    id: "e-git-actions",
    source: "git",
    target: "github-actions",
    animated: true,
  },
  {
    id: "e-actions-docker",
    source: "github-actions",
    target: "docker",
    animated: true,
    label: "Build",
  },
  {
    id: "e-docker-aws",
    source: "docker",
    target: "aws",
    animated: true,
    label: "Deploy",
  },
  // Cross-zone connections
  {
    id: "e-frontend-fastapi",
    source: "nextjs",
    target: "fastapi",
    label: "API Call",
  },
  {
    id: "e-frontend-springboot",
    source: "nextjs",
    target: "springboot",
    label: "API Call",
  },
  {
    id: "e-fastapi-db",
    source: "fastapi",
    target: "postgresql",
    label: "Connects to",
  },
  {
    id: "e-springboot-db",
    source: "springboot",
    target: "mysql",
    label: "Connects to",
  },
];

const Skills = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeMouseEnter = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      // ✅ FIX: Only highlight if the node is NOT a group panel.
      if (node.type !== "group") {
        setNodes((nds) =>
          nds.map((n) => {
            if (n.id === node.id) {
              return {
                ...n,
                style: {
                  ...n.style,
                  backgroundColor: "#8A2BE2",
                  color: "white",
                },
              };
            }
            return n;
          })
        );
        setEdges((eds) =>
          eds.map((edge) => {
            if (edge.source === node.id || edge.target === node.id) {
              return {
                ...edge,
                animated: true,
                style: { ...edge.style, stroke: "#8A2BE2", strokeWidth: 2 },
              };
            }
            return edge;
          })
        );
      }
    },
    [setNodes, setEdges]
  );

  const onNodeMouseLeave = useCallback(
    (_event: React.MouseEvent, _node: Node) => {
      // Reset all nodes and edges to their initial styles
      setNodes((nds) =>
        nds.map((n) => {
          const initialNode = initialNodes.find(
            (initNode) => initNode.id === n.id
          );
          return { ...n, style: initialNode?.style };
        })
      );
      setEdges((eds) =>
        eds.map((edge) => {
          const initialEdge = initialEdges.find((e) => e.id === edge.id);
          return {
            ...edge,
            animated: initialEdge?.animated || false,
            style: initialEdge?.style,
          };
        })
      );
    },
    [setNodes, setEdges]
  );

  return (
    <section id="skills" className="container mx-auto px-6 py-24 h-[900px]">
      <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">
        My Arsenal
      </h2>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeMouseEnter={onNodeMouseEnter}
        onNodeMouseLeave={onNodeMouseLeave}
        fitView
        proOptions={{ hideAttribution: true }}
        className="bg-secondary rounded-lg"
        nodesDraggable={true}
      >
        <Controls showInteractive={false} />
        <Background gap={16} />
      </ReactFlow>
    </section>
  );
};

const SkillsSection = () => (
  <ReactFlowProvider>
    <Skills />
  </ReactFlowProvider>
);

export default SkillsSection;
