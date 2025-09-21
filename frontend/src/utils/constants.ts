export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
    },
    PROJECTS: {
        LIST: '/projects',
        CREATE: '/projects',
        GET: (id: number) => `/projects/${id}`,
        UPDATE: (id: number) => `/projects/${id}`,
        DELETE: (id: number) => `/projects/${id}`,
    },
    AI: {
        GENERATE: '/ai/generate',
    },
};

export const STORAGE_KEYS = {
    TOKEN: 'token',
    USER: 'user',
};