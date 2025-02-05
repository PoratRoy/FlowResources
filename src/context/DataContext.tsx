'use client';

import { Project } from '@/models/types/project';
import { fetchProjectDetails } from '@/lib/database';
import { Category } from '@/models/types/category';
import { Website } from '@/models/types/website';
import { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { getSessionData, setSessionCategories, setSessionProjects, setSessionWebsites } from '@/utils/storage';
import { fetchCreateCategory, fetchCreateProject, fetchCreateWebsite, fetchGetAllProjects } from '@/utils/services';

type DataContextType = {
  projects: Project[];
  addProject: (title: string) => Promise<Project | null>;
  removeProject: (projectKey: string) => void;
  selectProject: (project: Project) => Promise<void>;
  selectedProject: Project | null;
  categories: Category[];
  addCategory: (title: string) => Promise<Category | null>;
  websites: Website[];
  addWebsite: (newWebsite: Omit<Website, 'id'>) => Promise<boolean>;
  removeWebsite: (currentWebsites: Website[], websiteId: string) => Website[];
  isProjectLoading: boolean;
  isWebsitesLoading: boolean;
  isCategoriesLoading: boolean;
};

const initialDataContext: DataContextType = {
  projects: [],
  addProject: async (_: string) => null,
  removeProject: (_: string) => {},
  selectProject: (_: Project) => Promise.resolve(),
  selectedProject: null,
  categories: [],
  addCategory: async (_: string) => null,
  websites: [],
  addWebsite: async (_: Omit<Website, 'id'>) => false,
  removeWebsite: (_: Website[], __: string) => [],
  isProjectLoading: false,
  isWebsitesLoading: false,
  isCategoriesLoading: false,
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
      setSessionCategories(categories);
      setSessionWebsites(websites);
      setCategories(categories);
      setWebsites(websites);
    }
  };

  const blockRef = useRef<boolean>(true);
  useEffect(() => {
    const loadProjects = async () => {
      setIsProjectLoading(true);
      try {
        const { sessionProjects, sessionCategories, sessionWebsites } = getSessionData();
        if (sessionProjects && sessionProjects.length > 0) {
          setProjects(sessionProjects);
          setSelectedProject(sessionProjects[0]);
          if (
            sessionWebsites &&
            sessionWebsites.length > 0 &&
            sessionCategories &&
            sessionCategories.length > 0
          ) {
            setCategories(sessionCategories);
            setWebsites(sessionWebsites);
          } else {
            await getProjectDetails(sessionProjects[0]?.id);
          }
        } else {
          const projectsData = await fetchGetAllProjects();
          if (projectsData.length > 0) {
            setProjects(projectsData);
            await selectProject(projectsData[0]);
            setSessionProjects(projectsData);
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
      const newProject = await fetchCreateProject(title);
      if (newProject) {
        setProjects((prevProjects) => {
          const projects = [...prevProjects, newProject];
          setSessionProjects(projects);
          return projects;
        });
        await selectProject(newProject);
        return newProject;
      }
    } catch (error) {
      console.error('Error adding project:', error);
    } finally {
      setIsProjectLoading(false);
    }
    return null;
  };

  const removeProject = (projectKey: string) => {
    setProjects((prevProjects) => prevProjects.filter((project) => project.id !== projectKey));
  };

  const addCategory = async (title: string): Promise<Category | null> => {
    try {
      setIsCategoriesLoading(true);
      const newCategory = await fetchCreateCategory(title);
      if (newCategory) {
        setCategories((prevCategories) => {
          const categories = [...prevCategories, newCategory];
          setSessionCategories(categories);
          return categories;
        });
        return newCategory;
      }
    } catch (error) {
      console.error('Error adding category:', error);
    } finally {
      setIsCategoriesLoading(false);
    }
    return null;
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
      const createdWebsite = await fetchCreateWebsite(newWebsite, selectedProject.id);
      if (createdWebsite) {
        setWebsites((prevWebsites) => {
          const websites = [...prevWebsites, createdWebsite];
          setSessionWebsites(websites);
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
        addCategory,
        websites,
        addWebsite,
        removeWebsite,
        isProjectLoading,
        isWebsitesLoading,
        isCategoriesLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
