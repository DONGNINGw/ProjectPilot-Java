import React, { createContext, useContext, useEffect, useState } from "react";

interface User{
    id: number
    username: string;
    email: string;
}
interface AuthContextType {
    user: User | null;
    token:string | null;
    login:(username:string, password: string) => Promise<void>;
    logout:() => void;
    loading: boolean;
}

const AuthConetxt = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider :React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        // 从localStorage恢复登陆状态
        const savedToken = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');

        if (savedToken && savedUser) {
            setToken(savedToken);
            setUser(JSON.parse(savedUser));
        }
        setLoading(false)
    }, []);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const login = async (username: string, _password: string) => {
        // TODO：实现登录API调用
        const mockUser = {id: 1, username, email: `${username}@example.com`};
        const mockToken = 'mock-jwt-token';

        setUser(mockUser);
        setToken(mockToken);
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
    }

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    return (
        <AuthConetxt.Provider value={{user, token, login, logout, loading}}>
            {children}
        </AuthConetxt.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
    const context = useContext(AuthConetxt);
    if (context == undefined) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
}