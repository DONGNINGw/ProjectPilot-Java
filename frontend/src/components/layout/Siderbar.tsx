import  React  from "react";
import { Layout, Menu } from "antd";
import {ProjectOutlined, PlusOutlined, HistoryOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';

const { Sider } = Layout;
/**
 * Sidebar组件的Props接口
 * collapsed: 控制侧边栏是否折叠
 * onMenuClick: 菜单项点击回调函数
 */
interface SiderbarProps {
    collapsed: boolean;
    onMenuClick: (key: string) => void;
}


/**
 * Sidebar组件 - 左侧导航菜单
 * 
 * 设计目的：
 * 1. 提供主要功能的快速访问入口
 * 2. 支持折叠/展开，节省屏幕空间
 * 3. 清晰的功能分组和图标识别
 * 4. 响应式设计，适配不同屏幕尺寸
 */
const Sidebar: React.FC<SiderbarProps> =({collapsed, onMenuClick}) => {
    /**
   * 菜单项配置
   * 为什么选择这些功能：
   * 1. "我的项目" - 核心功能，用户最常用的入口
   * 2. "新建项目" - 快速创建，提高用户效率
   * 3. "最近访问" - 便于用户快速回到之前的工作
   */
    const items: MenuProps['items'] = [
        {
            key: 'project',
            icon: <ProjectOutlined />,  // 项目图标，直观表示功能
            label: '我的项目'
        },
        {
            key: 'new-project',
            icon: <PlusOutlined />,     // 加号图标，通用的"新建"含义
            label: '新建项目'
        },
        {
            key: 'recent',
            icon: <HistoryOutlined />,  // 历史图标，表示最近访问
            label: '最近访问'
        },
    ];

    return (
        <Sider
        trigger={null}                          // 不显示默认的折叠触发器，由父组件控制
        collapsible                             // 支持折叠功能
        collapsed={collapsed}                   // 折叠状态由父组件传入
        breakpoint="lg"                         // 在lg断点自动折叠
        collapsedWidth={80}                     // 折叠后的宽度
        width={240}                             // 展开时的宽度
        style={{background: '#fff', borderRight: '1px solid #f0f0f0'}}            // 白色背景，与整体设计保持一致
        >
            <Menu 
                mode="inline"                           // 内联模式，适合侧边栏
                defaultSelectedKeys={['project']}       // 默认选中"我的项目"
                items={items}                           // 菜单项配置
                onClick={({ key }) => onMenuClick(key)} // 点击事件处理
                style={{borderRight: 0, height: '100%'}}                // 移除右边框，避免视觉干扰
            />
        </Sider>
    );
};

export default Sidebar;