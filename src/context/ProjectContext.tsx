'use client';

import { Project } from '@/models/types/project';
import { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { createProject, fetchProjects } from '@/lib/database';

type ProjectContextType = {
  projects: Project[];
  addProject: (title: string) => Promise<void>;
  removeProject: (projectKey: string) => void;
  isLoading: boolean;
};

export const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function useProjectContext() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjectContext must be used within a ProjectProvider');
  }
  return context;
}

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const blockRef = useRef<boolean>(true);
  useEffect(() => {
    const loadProjects = async () => {
      setIsLoading(true);
      try {
        const projectsData = await fetchProjects();
        setProjects(projectsData);
        blockRef.current = false;
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if(blockRef.current) loadProjects();
  }, []);

  const addProject = async (title: string) => {
    setIsLoading(true);
    try {
      const newProject = await createProject(title);
      if (newProject) {
        setProjects((prevProjects) => [...prevProjects, newProject]);
      }
    } catch (error) {
      console.error('Error adding project:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeProject = (projectKey: string) => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== projectKey)
    );
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        addProject,
        removeProject,
        isLoading,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

