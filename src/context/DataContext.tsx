'use client';

import { Project } from '@/models/types/project';
import { Category } from '@/models/types/category';
import { Website } from '@/models/types/website';
import { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import {
  getSessionData,
  setSessionCategories,
  setSessionProjects,
  setSessionWebsites,
} from '@/utils/storage';
import {
  fetchCreateCategory,
  fetchCreateProject,
  fetchCreateWebsite,
  fetchDeleteCategory,
  fetchDeleteProject,
  fetchDeleteWebsite,
  fetchGetAllProjects,
  fetchProjectDetails,
} from '@/utils/services';
import { useQueryParam } from '@/hooks/useQueryParam';
import query from "../models/constants/queryParams.json";

type DataContextType = {
  projects: Project[];
  addProject: (title: string) => Promise<Project | null>;
  deleteProject: (projectKey: number) => Promise<number | null>;
  selectProject: (project: Project) => Promise<void>;
  selectedProject: Project | null;
  categories: Category[];
  addCategory: (title: string) => Promise<Category | null>;
  deleteCategory: (categoryId: number) => Promise<number | null>;
  clearDeletedCategories: () => void;
  deletedCategories: number[];
  websites: Website[];
  addWebsite: (newWebsite: Omit<Website, 'id'>) => Promise<boolean>;
  deleteWebsite: (websiteId: number) => Promise<number | null>;
  isProjectLoading: boolean;
  isWebsitesLoading: boolean;
  isCategoriesLoading: boolean;
};

const initialDataContext: DataContextType = {
  projects: [],
  addProject: async (_: string) => null,
  deleteProject: async (_: number) => null,
  selectProject: (_: Project) => Promise.resolve(),
  selectedProject: null,
  categories: [],
  addCategory: async (_: string) => null,
  deleteCategory: async (_: number) => null,
  clearDeletedCategories: () => {},
  deletedCategories: [],
  websites: [],
  addWebsite: async (_: Omit<Website, 'id'>) => false,
  deleteWebsite: async (_: number) => null,
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
  const [isProjectLoading, setIsProjectLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);
  const [deletedCategories, setDeletedCategories] = useState<number[]>([]);
  const [websites, setWebsites] = useState<Website[]>([]);
  const [isWebsitesLoading, setIsWebsitesLoading] = useState(false);

  const { searchParam, addProjectQueryParam } = useQueryParam();

  const selectProject = async (project: Project) => {
    setSelectedProject(project);
    await getProjectDetails(project.id);
  };

  const getProjectDetails = async (projectId: number) => {
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
          addProjectQueryParam(sessionProjects[0].title);
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

        const queryProject = searchParam()
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

  const deleteProject = async (projectId: number) => {
    setIsProjectLoading(true);
    try {
      const error = await fetchDeleteProject(projectId);
      if (error) {
        console.error('Error deleting project:', error);
        return null;
      }
      setProjects((prevProjects) => {
        const projects = prevProjects.filter((project) => project.id !== projectId);
        setSessionProjects(projects);
        return projects;
      });
      return projectId;
    } catch (error) {
      console.error('Error deleting project:', error);
    } finally {
      setIsProjectLoading(false);
    }
    return null;
  };

  const addCategory = async (title: string): Promise<Category | null> => {
    try {
      setIsCategoriesLoading(true);
      if (selectedProject) {
        const newCategory = await fetchCreateCategory(title, selectedProject.id);
        if (newCategory) {
          setCategories((prevCategories) => {
            const categories = [...prevCategories, newCategory];
            setSessionCategories(categories);
            return categories;
          });
          return newCategory;
        }
      }
    } catch (error) {
      console.error('Error adding category:', error);
    } finally {
      setIsCategoriesLoading(false);
    }
    return null;
  };

  const deleteCategory = async (categoryId: number): Promise<number | null> => {
    setIsCategoriesLoading(true);
    try {
      if (selectedProject && selectedProject.id) {
        const error = await fetchDeleteCategory(categoryId, selectedProject.id);
        if (error) {
          console.error('Error deleting category:', error);
          return null;
        }
        setDeletedCategories((prevDeletedCategories) => [...prevDeletedCategories, categoryId]);
        setCategories((prevCategories) => {
          const categories = prevCategories.filter((category) => category.id !== categoryId);
          setSessionCategories(categories);
          return categories;
        });
        setWebsites((prevWebsites) => {
          const websites = prevWebsites.filter((website) => website.category != categoryId);
          setSessionWebsites(websites);
          return websites;
        });
        return categoryId;
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    } finally {
      setIsCategoriesLoading(false);
    }
    return null;
  };

  const clearDeletedCategories = () => {
    setDeletedCategories([]);
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

  const deleteWebsite = async (websiteId: number): Promise<number | null> => {
    setIsWebsitesLoading(true);
    try {
      const error = await fetchDeleteWebsite(websiteId);
      if (error) {
        console.error('Error deleting website:', error);
        return null;
      }
      setWebsites((prevWebsites) => {
        const websites = prevWebsites.filter((website) => website.id !== websiteId);
        setSessionWebsites(websites);
        return websites;
      });
      return websiteId;
    } catch (error) {
      console.error('Error deleting website:', error);
    } finally {
      setIsWebsitesLoading(false);
    }
    return null;
  };

  return (
    <DataContext.Provider
      value={{
        projects,
        addProject,
        deleteProject,
        selectProject,
        selectedProject,
        categories,
        addCategory,
        deleteCategory,
        clearDeletedCategories,
        deletedCategories,
        websites,
        addWebsite,
        deleteWebsite,
        isProjectLoading,
        isWebsitesLoading,
        isCategoriesLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
