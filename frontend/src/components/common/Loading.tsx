import React from "react";
import { Spin } from "antd";

interface LoadingProps {
    size?: 'small' | 'default' | 'large';
    tip?: string;
}

const Loading: React.FC<LoadingProps> = ({ size = 'default', tip = '加载中...' }) => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '200px',
        }}>
            <Spin size={size} tip={tip} />
        </div>
    )
}

export default Loading;