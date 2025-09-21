import api from './api';

export interface Project {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export interface ProjectData {
    nodes: unknown[];
    edges: unknown[];
}

export const projectService = {
    getProjects: async (): Promise<Project[]> => {
        const response = await api.get('/projects');
        return response.data;
    },

    createProject: async (data: { name: string; description: string }): Promise<Project> => {
        const response = await api.post('/projects', data);
        return response.data;
    },

    getProject: async (id: number): Promise<Project & ProjectData> => {
        const response = await api.get(`/projects/${id}`);
        return response.data;
    },

    saveProject: async (id: number, data: ProjectData) => {
        const response = await api.put(`/projects/${id}`, data);
        return response.data;
    },

    generateWithAI: async (goal: string) => {
        const response = await api.post('/ai/generate', { goal });
        return response.data;
    },
};