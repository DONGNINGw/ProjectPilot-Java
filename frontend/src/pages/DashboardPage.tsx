/* eslint-disable @typescript-eslint/no-unused-vars */
import { Avatar, Button, Card, Layout, List } from "antd"
import React, { useEffect, useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { useProject } from "../hooks/useProject"
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Siderbar";
import { PlusOutlined, ProjectOutlined } from '@ant-design/icons';



const { Content } = Layout;
const DashboardPage: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false)
    const { user, logout } = useAuth()
    const { projects, loading, fetchProjects } = useProject()

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects])

    const handleMenuClick = (key: string) => {
        console.log('Menu clicked', key)
    }

    return (
        <Layout style={{minHeight: '100vh', height: '100vh'}}>
            <Header user={user || undefined} onLogout={logout}/>
            <Layout style={{ height: 'calc(100vh - 64px)' }}>
                <Sidebar collapsed={collapsed} onMenuClick={handleMenuClick} />
                    <Layout style={{ padding: '24px', overflow: 'auto' }}>
                        <Content style={{background: '#fff', padding:'24px', borderRadius: '8px',minHeight: 'fit-content'}}>
                            <div style={{marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems:'center', flexWrap: 'wrap', gap:'16px'}}>
                                <h2 style={{ margin: 0 }}>我的项目</h2>
                                <Button type="primary" icon={<PlusOutlined />} size="large">新建项目</Button>
                            </div>

                            <List
                                loading={loading}
                                grid={{gutter: [16,16], xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 5}}
                                dataSource={(projects)}
                                renderItem={(project: { name: string; description: string }) =>(
                                    <List.Item>
                                        <Card
                                            hoverable
                                            style={{ 
                                                height: '100%',
                                                minHeight: '200px'
                                            }}
                                            actions={[
                                                <Button type="link">编辑</Button>,
                                                <Button type="link">删除</Button>,
                                            ]}
                                        >
                                            <Card.Meta
                                                avatar={<Avatar icon={<ProjectOutlined />} />}
                                                title={project.name}
                                                description={
                                                    <div style={{overflow:'hidden', textOverflow:'ellipsis', display:'-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', minHeight:'60px'}}>
                                                        {project.description}
                                                    </div>
                                                }
                                            />
                                        </Card>
                                    </List.Item>
                                )}
                            />
                        </Content>
                    </Layout>
            </Layout>
        </Layout>
    )
}

export default DashboardPage;