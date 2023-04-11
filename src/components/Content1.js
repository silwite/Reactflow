import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
 
  useNodesState,
  useEdgesState,

} from 'reactflow';
import 'reactflow/dist/style.css';

import Sidebar from './Content2';

import './content1.css';


let id = 0;
const getId = () => `dndnode_${id++}`;

function DnDFlow  ({input}) {
  const initialNodes = [
    {
      id: '1',
      type: 'input',
      data: { label: '=>|input |'+ input},  
      position: { x: 250, y: 5 },
      hasInputEdge: true,
    },
  ];
  console.log({input});
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const onConnect = useCallback(
    (params) => {
      setEdges((els) => addEdge(params, els));
      const inputNode =nodes.find((els) => els.id === params.source);
      if (inputNode && inputNode.type === 'input' ||inputNode && inputNode.type === 'default') {
        const connectedNode = nodes.find((els) => els.id === params.target);
        if (connectedNode) {
          connectedNode.hasInputEdge = true;
          setNodes([...nodes]); 
        }
      }
    },
    [nodes]
  );
 
 
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
 console.log(type);
 const arr =type.split(',');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type : 'default',
        position,
        data: { label: `${arr[2]} | ${arr[0]} | ${arr[1]}  `},        
        hasInputEdge: false,
        
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
    <div className="dndflow" style={{ height: 250, width: '100%' }}>
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes.map((node) => ({
              ...node,
              style: { borderColor: node.hasInputEdge ? 'blue' : 'red' },
            }))}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
           
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView


            
          >
           
          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
