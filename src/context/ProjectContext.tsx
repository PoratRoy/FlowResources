'use client';

import { Project } from '@/models/types/project';
import { createContext, useContext, useState, ReactNode } from 'react';

type ProjectContextType = {
  projects: Project[];
  addProject: (newProject: Project) => void;
  removeProject: (projectKey: string) => void;
};

export const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);

  const addProject = (newProject: Project) => {
    setProjects((prevProjects) => [...prevProjects, newProject]);
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
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjectContext() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjectContext must be used within a ProjectProvider');
  }
  return context;
}
