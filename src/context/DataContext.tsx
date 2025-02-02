'use client';

import { Project } from '@/models/types/project';
import { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { createProject, createWebsite, fetchProjects } from '@/lib/database';
import { Category } from '@/models/types/category';
import { Website } from '@/models/types/website';

type DataContextType = {
  projects: Project[];
  addProject: (title: string) => Promise<Project | null>;
  removeProject: (projectKey: string) => void;
  selectProject: (project: Project) => void;
  setProjectDetails: (websites: Website[], categories: Category[]) => void;
  selectedProject: Project | null;
  isProjectLoading: boolean;
  categories: Category[];
  websites: Website[];
  addWebsite: (currentWebsites: Website[], newWebsite: Omit<Website, 'id'>) => Promise<Website[]>;
  removeWebsite: (currentWebsites: Website[], websiteId: string) => Website[];
};

const initialDataContext: DataContextType = {
  projects: [],
  addProject: async (title: string) => null,
  removeProject: (projectKey: string) => {},
  selectProject: (project: Project) => {},
  setProjectDetails: (websites: Website[], categories: Category[]) => {},
  selectedProject: null,
  isProjectLoading: false,
  categories: [],
  websites: [],
  addWebsite: async (currentWebsites: Website[], newWebsite: Omit<Website, 'id'>) => [],
  removeWebsite: (currentWebsites: Website[], websiteId: string) => [],
};

export const DataContext = createContext<DataContextType | undefined>(initialDataContext);

export function useDataContext() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useDataContext must be used within a DataContextProvider');
  }
  return context;
}

export function DataContextProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isProjectLoading, setIsProjectLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);
  const [websites, setWebsites] = useState<Website[]>([]);
  const [isWebsitesLoading, setIsWebsitesLoading] = useState(false);

  const blockRef = useRef<boolean>(true);
  useEffect(() => {
    const loadProjects = async () => {
      setIsProjectLoading(true);
      try {
        const projectsData = await fetchProjects();
        setProjects(projectsData);
        blockRef.current = false;
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setIsProjectLoading(false);
      }
    };

    if (blockRef.current) loadProjects();
  }, []);

  const addProject = async (title: string) => {
    setIsProjectLoading(true);
    try {
      const newProject = await createProject(title);
      if (newProject) {
        setProjects((prevProjects) => [...prevProjects, newProject]);
        return newProject;
      }
    } catch (error) {
      console.error('Error adding project:', error);
    } finally {
      setIsProjectLoading(false);
      return null;
    }
  };

  const removeProject = (projectKey: string) => {
    setProjects((prevProjects) => prevProjects.filter((project) => project.id !== projectKey));
  };

  const selectProject = (project: Project) => {
    setSelectedProject(project);
  };

  const setProjectDetails = (websites: Website[], categories: Category[]) => {
    setWebsites(websites);
    setCategories(categories);
  };

  const addCategory = (newCategory: Category): void => {
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };

  const removeCategory = (categoryId: string): void => {
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category.id !== categoryId)
    );
  };

  const addWebsite = async (
    currentWebsites: Website[],
    newWebsite: Omit<Website, 'id'>
  ): Promise<Website[]> => {
    if (!selectedProject) {
      console.error('No project selected');
      return currentWebsites;
    }

    const createdWebsite = await createWebsite(newWebsite, selectedProject.id);
    if (createdWebsite) {
      const newWebsites = [...currentWebsites, createdWebsite];
      setWebsites(newWebsites);
      return newWebsites;
    }
    return currentWebsites;
  };

  const removeWebsite = (currentWebsites: Website[], websiteId: string): Website[] => {
    return currentWebsites.filter((website) => website.id !== websiteId);
  };

  return (
    <DataContext.Provider
      value={{
        projects,
        addProject,
        removeProject,
        selectProject,
        setProjectDetails,
        selectedProject,
        isProjectLoading,
        categories,
        websites,
        addWebsite,
        removeWebsite,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
