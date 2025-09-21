import React from "react";
import { ReactFlow, Background, Controls, MiniMap, BackgroundVariant, type Node, type Edge, type OnNodesChange, type OnEdgesChange, type OnConnect } from '@xyflow/react';
import '@xyflow/react/dist/style.css'

interface FlowCanvasProps {
    nodes: Node[];
    edges: Edge[];
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
}
const FlowCanvas: React.FC<FlowCanvasProps> = ({
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
}) => {
    return(
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                fitViewOptions={{
                    padding: 0.2,
                }}
                minZoom={0.1}
                maxZoom={2}
            >
                <Controls position="top-left" style={{ backgroundColor: '#fff', border: '1px solid #d9d9d9', color:'#000'}} />
                <MiniMap 
                    position="bottom-right" 
                    style={{ backgroundColor: '#fff', border: '1px solid #d9d9d9'}} 
                    nodeStrokeWidth={3}
                    nodeColor='#1890ff'
                    maskColor="rgba(0, 0, 0, 0.1)"
                />
                <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#f0f0f0" />
            </ReactFlow>
        </div>
    )
}

export default FlowCanvas;