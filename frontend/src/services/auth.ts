import api from './api';

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: {
        id: number;
        username: string;
        email: string;
    };
}

export const authService = {
    login: async (data: LoginRequest): Promise<LoginResponse> => {
        const response = await api.post('/auth/login', data);
        return response.data;
    },

    register: async (data: LoginRequest & { email: string }) => {
        const response = await api.post('/auth/register', data);
        return response.data;
    },
};