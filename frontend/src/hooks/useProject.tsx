import { useState, useCallback } from 'react';

interface Project {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export const useProject = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchProjects = useCallback(async () => {
        setLoading(true);
        try {
        // TODO: 实现API调用
        const mockProjects: Project[] = [
            {
            id: 1,
            name: '示例项目1',
            description: '这是一个示例项目',
            createdAt: '2024-01-01',
            updatedAt: '2024-01-01'
            }
        ];
        setProjects(mockProjects);
        } catch (error) {
        console.error('Failed to fetch projects:', error);
        } finally {
        setLoading(false);
        }
    }, []);
    const createProject = useCallback(async (name: string, description: string) => {
    // TODO: 实现创建项目API
        console.log('Creating project:', name, description);
    }, []);

    const saveProject = useCallback(async (projectId: number, data: unknown) => {
        // TODO: 实现保存项目API
        console.log('Saving project:', projectId, data);
    }, []);

    return {
        projects,
        loading,
        fetchProjects,
        createProject,
        saveProject,
    };
}
