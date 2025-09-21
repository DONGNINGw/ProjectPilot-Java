import React, { useState, useCallback } from 'react';
import { Layout, Button, Input, Card, message } from 'antd';
import { useNodesState, useEdgesState, addEdge, type Connection, type Edge, type Node } from '@xyflow/react';
import Header from '../components/layout/Header';
import FlowCanvas from '../components/flow/FlowCanvas';
import { useAuth } from '../hooks/useAuth';

const { Content } =Layout;
const { TextArea } = Input;

const EditorPage: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    const [goal, setGoal] = useState('');
    const [generating, setGenerating] = useState(false);
    const {user, logout} = useAuth();

    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    const handleGenerate = async () => {
        if (!goal.trim()) {
            message.error('请输入项目目标');
            return;
        }

        setGenerating(true);
        try {
            //TODO:  调用AI生成API
            message.success('项目生成成功');
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            message.error('生成失败，请重试');
        } finally{
            setGenerating(false);
        }
    }

    return (
        <Layout style={{
            minHeight: '100vh',
            height:'100vh',
            overflow: 'hidden'
        }}>
            <Header user={user || undefined} onLogout={logout}/>
            <Content style={{padding: '24px', display: 'flex', flexDirection: 'column',height: 'calc(100vh - 64px)', overflow: 'hidden'}}>
                <div style={{display: 'flex', gap: '24px',flex: 1, minHeight: 0}}>
                    <div style={{width: '320px', flexShrink: 0, display: 'flex', flexDirection: 'column'}}>
                         <Card title="项目目标" style={{width:'fit-content', marginBottom: '16px'}}>
                            <TextArea 
                                rows={6}
                                placeholder='请描述你的项目目标...'
                                value={goal}
                                onChange={(e) => setGoal(e.target.value)}
                                style={{marginBottom: '16px'}}
                            />
                            <Button 
                                type='primary'
                                loading={generating}
                                onClick={handleGenerate}
                                style={{width: '100%'}}
                            >
                                生成任务树
                            </Button>
                        </Card>
                        <Card title="操作面板" size='small' style={{flex: 1}}>
                            <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                                <Button size='small'>保存项目</Button>
                                <Button size='small'>导出为JSON</Button>
                                <Button size='small'>导出为Markdown</Button>

                            </div>
                        </Card>
                    </div>
                    <Card 
                        title="任务流程图" 
                        style={{flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0}}
                        styles={{body: {flex: 1, padding: '16px', display: 'flex', flexDirection: 'column'}}} // 使用新的styles API
                    >
                        <div style={{flex: 1, minHeight: 0,border: '1px solid #f0f0f0', borderRadius:'6px', overflow: 'hidden'}}> 
                            <FlowCanvas 
                                nodes={nodes}
                                edges={edges}
                                onNodesChange={onNodesChange}
                                onEdgesChange={onEdgesChange}
                                onConnect={onConnect}
                            />
                        </div>
                    </Card>
                </div>
            </Content>
        </Layout>
    )

}

export default EditorPage;
