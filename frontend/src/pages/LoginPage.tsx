import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Button, Card, Form, Input, message } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const LoginPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const onFinish = async (values: { username: string; password: string }) => {
        setLoading(true);
        try{
            await login(values.username, values.password);
            message.success('登录成功');
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error){
            message.error('登录失败，请检查用户名和密码');
        }finally{
            setLoading(false);
        }
    }

    return(
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            background: '#f0f2f5'
        }}>
            <Card title="ProjectPilot 登录" style={{ width: 400}}>
                <Form
                    name="login"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        name={"username"}
                        rules={[{required: true, message: '请输入用户名！'}]}
                    >
                        <Input 
                            prefix = {<UserOutlined />}
                            placeholder="用户名"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name={"password"}
                        rules={[{required: true, message: '请输入密码！'}]}
                    >
                        <Input 
                            prefix = {<LockOutlined />}
                            placeholder="密码"
                            type="password"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button 
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            size="large"
                            style={{width: '100%'}}
                        >
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )

}

export default LoginPage;