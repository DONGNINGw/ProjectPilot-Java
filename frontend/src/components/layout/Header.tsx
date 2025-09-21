import type React from "react";
import { Avatar, Button, Dropdown, Layout } from "antd";
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

// 从Ant Design的Layout中解构出Header组件，重命名为AntHeader避免命名冲突
const { Header: AntHeader } = Layout;

/**
 * Header组件的Props接口定义
 * 这样设计的好处：
 * 1. 类型安全：TypeScript会在编译时检查传入的props是否正确
 * 2. 可选性：user和onLogout都是可选的，增加组件的灵活性
 * 3. 清晰的契约：明确定义了组件需要什么数据和回调函数
 */
interface HeaderProps {
    user?: {
        username: string;
        email: string;
    };
    onLogout?: () => void;
}
/**
 * Header组件 - 应用顶部导航栏
 * 
 * 设计理念：
 * 1. 展示应用品牌标识（ProjectPilot）
 * 2. 显示当前登录用户信息
 * 3. 提供用户操作菜单（个人资料、退出登录）
 * 4. 保持简洁的视觉设计，不干扰主要内容
 */
const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
    /**
     * 用户下拉菜单配置
     * 为什么这样设计：
     * 1. 符合用户习惯：点击头像/用户名显示操作菜单
     * 2. 节省空间：将不常用的操作收纳到下拉菜单中
     * 3. 可扩展性：后续可以轻松添加更多用户操作选项
     */
    const items: MenuProps['items'] = [
        {
            key: 'profile',
            icon: <UserOutlined />,
            label: '个人资料',
            // 注意：这里暂时没有onClick，后续可以添加跳转到个人资料页面的逻辑
        },
        {
            type: 'divider',// 分割线，用于视觉上分组不同类型的操作
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: '退出登录',
            onClick: onLogout,// 直接绑定父组件传入的退出登录回调
        }
    ];

    return (
        <AntHeader style={{
            display: 'flex',// 使用Flexbox布局
            justifyContent: 'space-between',// 左右两端对齐（品牌名 vs 用户信息）
            alignItems: 'center',// 垂直居中对齐
            background: '#fff',// 白色背景，保持简洁
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',// 轻微阴影，增加层次感

        }}>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1890ff'}}>
                ProjectPilot
            </div>
            {/* 右侧：用户信息区域 */}
            {/* 
                条件渲染：只有当用户已登录时才显示用户信息
                这样设计的好处：
                1. 避免在登录页面显示空的用户信息
                2. 组件可以在不同的登录状态下复用
            */}
            {
                user && (
                    <Dropdown menu={{ items}} placement="bottomRight"/* 下拉菜单出现在右下方 */ trigger={['click']}/*点击触发（默认值，可以省略）*/> 
                        <Button type="text"/*文本按钮，没有边框，更简洁*/ style={{display: 'flex', alignItems: 'center', gap: '8px'/*头像和用户名之间的间距*/}}> 
                            <Avatar size="small" icon={<UserOutlined />}/* 默认用户图标,后续可以扩展为显示用户真实头像 */ /> 
                            {user.username}
                        </Button>
                    </Dropdown>
                )
            }
        </AntHeader>
    );
};

export default Header;