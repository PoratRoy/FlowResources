'use client';

import { Project } from '@/models/types/project';
import { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { createProject, createWebsite, fetchProjectDetails, fetchProjects } from '@/lib/database';
import { Category } from '@/models/types/category';
import { Website } from '@/models/types/website';
import SessionStorage, { SKey } from '@/utils/sessionStorage';

type DataContextType = {
  projects: Project[];
  addProject: (title: string) => Promise<Project | null>;
  removeProject: (projectKey: string) => void;
  selectProject: (project: Project) => Promise<void>;
  selectedProject: Project | null;
  categories: Category[];
  websites: Website[];
  addWebsite: (newWebsite: Omit<Website, 'id'>) => Promise<boolean>;
  removeWebsite: (currentWebsites: Website[], websiteId: string) => Website[];
  isProjectLoading: boolean;
  isWebsitesLoading: boolean;
};

const initialDataContext: DataContextType = {
  projects: [],
  addProject: async (_: string) => null,
  removeProject: (_: string) => {},
  selectProject: (_: Project) => Promise.resolve(),
  selectedProject: null,
  categories: [],
  websites: [],
  addWebsite: async (_: Omit<Website, 'id'>) => false,
  removeWebsite: (_: Website[], __: string) => [],
  isProjectLoading: false,
  isWebsitesLoading: false,
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

  const selectProject = async (project: Project) => {
    setSelectedProject(project);
    await getProjectDetails(project.id);
  };

  const getProjectDetails = async (projectId: string) => {
    const result = await fetchProjectDetails(projectId);
    if (result) {
      const { websites, categories } = result;
      SessionStorage.set(SKey.Categories, categories);
      SessionStorage.set(SKey.Websites, websites);
      setCategories(categories);
      setWebsites(websites);
    }
  };

  const blockRef = useRef<boolean>(true);
  useEffect(() => {
    const loadProjects = async () => {
      setIsProjectLoading(true);
      try {
        const sessionProjects: Project[] = SessionStorage.get(SKey.Projects);
        const sessionCategories: Category[] = SessionStorage.get(SKey.Categories);
        const sessionWebsites: Website[] = SessionStorage.get(SKey.Websites);
        if (sessionProjects && sessionProjects.length > 0) {
          setProjects(sessionProjects);
          setSelectedProject(sessionProjects[0]);
          if (sessionWebsites && sessionWebsites.length > 0) {
            setWebsites(sessionWebsites);
          } else {
            await getProjectDetails(sessionProjects[0]?.id);
          }
        } else {
          const projectsData = await fetchProjects();
          if (projectsData.length > 0) {
            setProjects(projectsData);
            await selectProject(projectsData[0]);
            SessionStorage.set(SKey.Projects, projectsData);
          }
        }
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
    try {
      setIsProjectLoading(true);
      const newProject = await createProject(title);
      if (newProject) {
        setProjects((prevProjects) => {
          const projects = [...prevProjects, newProject];
          SessionStorage.set(SKey.Projects, projects);
          return projects;
        });
        await selectProject(newProject);
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

  const addCategory = (newCategory: Category): void => {
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };

  const removeCategory = (categoryId: string): void => {
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category.id !== categoryId)
    );
  };

  const addWebsite = async (newWebsite: Omit<Website, 'id'>): Promise<boolean> => {
    if (!selectedProject) {
      console.error('No project selected');
      return false;
    }
    try {
      setIsWebsitesLoading(true);
      const result = await createWebsite(newWebsite, selectedProject.id);
      if (result?.success) {
        const { data: createdWebsite } = result;
        setWebsites((prevWebsites) => {
          const websites = [...prevWebsites, createdWebsite];
          SessionStorage.set(SKey.Websites, websites);
          return websites;
        });
        return true;
      }
    } catch (error) {
      console.error('Error adding website:', error);
    } finally {
      setIsWebsitesLoading(false);
    }
    return false;
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
        selectedProject,
        categories,
        websites,
        addWebsite,
        removeWebsite,
        isProjectLoading,
        isWebsitesLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
