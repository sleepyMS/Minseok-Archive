import { useState, useCallback } from "react";
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

// --- Data for the Skill Map ---
const initialNodes: Node[] = [
  // Frontend
  {
    id: "react",
    position: { x: 0, y: 0 },
    data: { label: "React" },
    type: "default",
  },
  {
    id: "typescript",
    position: { x: -200, y: 100 },
    data: { label: "TypeScript" },
    type: "default",
  },
  {
    id: "tailwind",
    position: { x: 200, y: 100 },
    data: { label: "Tailwind CSS" },
    type: "default",
  },
  {
    id: "framer",
    position: { x: 0, y: 200 },
    data: { label: "Framer Motion" },
    type: "default",
  },

  // 3D / Graphics
  {
    id: "three",
    position: { x: 300, y: -100 },
    data: { label: "Three.js / R3F" },
    type: "default",
  },

  // Backend (Example)
  {
    id: "node",
    position: { x: -300, y: -100 },
    data: { label: "Node.js" },
    type: "default",
  },
];

const initialEdges: Edge[] = [
  // Connections from React
  { id: "e-react-ts", source: "react", target: "typescript", animated: true },
  {
    id: "e-react-tailwind",
    source: "react",
    target: "tailwind",
    animated: true,
  },
  { id: "e-react-framer", source: "react", target: "framer", animated: true },
  { id: "e-react-three", source: "react", target: "three", animated: true },

  // Other connections
  { id: "e-ts-node", source: "typescript", target: "node", animated: true },
];

const Skills = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // node 파라미터의 타입을 'any' 대신 'Node'로 정확하게 지정합니다.
  const onNodeMouseEnter = (_event: React.MouseEvent, node: Node) => {
    setEdges((eds) =>
      eds.map((edge) => {
        if (edge.source === node.id || edge.target === node.id) {
          return { ...edge, style: { stroke: "#8A2BE2", strokeWidth: 2 } };
        }
        return edge;
      })
    );
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === node.id) {
          return { ...n, style: { background: "#8A2BE2", color: "white" } };
        }
        return n;
      })
    );
  };

  const onNodeMouseLeave = (_event: React.MouseEvent, node: Node) => {
    setEdges((eds) => eds.map((edge) => ({ ...edge, style: undefined })));
    setNodes((nds) => nds.map((n) => ({ ...n, style: undefined })));
  };

  return (
    <section id="skills" className="container mx-auto px-6 py-24 h-[700px]">
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
        className="bg-secondary rounded-lg"
      >
        <Controls showInteractive={false} />
        <Background gap={16} />
      </ReactFlow>
    </section>
  );
};

// Wrap with ReactFlowProvider
const SkillsSection = () => (
  <ReactFlowProvider>
    <Skills />
  </ReactFlowProvider>
);

export default SkillsSection;
