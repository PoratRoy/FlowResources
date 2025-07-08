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
import { useQueryParam } from '@/hooks/useQueryParam';
import fetchProjectDetails from '@/app/actions/fetchProjectDetails';
import fetchGetAllProjects from '@/app/actions/fetchGetAllProjects';
import fetchCreateProject from '@/app/actions/fetchCreateProject';
import fetchDeleteProject from '@/app/actions/fetchDeleteProject';
import fetchCreateCategory from '@/app/actions/fetchCreateCategory';
import fetchDeleteCategory from '@/app/actions/fetchDeleteCategory';
import fetchCreateWebsite from '@/app/actions/fetchCreateWebsite';
import fetchDeleteWebsite from '@/app/actions/fetchDeleteWebsite';

type DataContextType = {
  projects: Project[];
  addProject: (title: string, categories: string[]) => Promise<Project | null>;
  deleteProject: (projectKey: string) => Promise<string | null>;
  selectProject: (project: Project) => Promise<void>;
  selectedProject: Project | null;
  categories: Category[];
  addCategory: (title: string) => Promise<Category | null>;
  deleteCategory: (categoryId: string) => Promise<string | null>;
  clearDeletedCategories: () => void;
  deletedCategories: string[];
  websites: Website[];
  addWebsite: (newWebsite: Omit<Website, 'id'>) => Promise<boolean>;
  deleteWebsite: (websiteId: string) => Promise<string | null>;
  isProjectLoading: boolean;
  isWebsitesLoading: boolean;
  isCategoriesLoading: boolean;
};

const initialDataContext: DataContextType = {
  projects: [],
  addProject: async (title: string, categories: string[]) => null,
  deleteProject: async (_: string) => null,
  selectProject: (_: Project) => Promise.resolve(),
  selectedProject: null,
  categories: [],
  addCategory: async (_: string) => null,
  deleteCategory: async (_: string) => null,
  clearDeletedCategories: () => {},
  deletedCategories: [],
  websites: [],
  addWebsite: async (_: Omit<Website, 'id'>) => false,
  deleteWebsite: async (_: string) => null,
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
  const [deletedCategories, setDeletedCategories] = useState<string[]>([]);
  const [websites, setWebsites] = useState<Website[]>([]);
  const [isWebsitesLoading, setIsWebsitesLoading] = useState(false);

  const { addProjectQueryParam } = useQueryParam();

  const selectProject = async (project: Project) => {
    setSelectedProject(project);
    await getProjectDetails(project.id);
  };

  const loadProjectData = async (projects: Project[]) => {
    setProjectData(projects);
    const { sessionCategories, sessionWebsites } = getSessionData();
    if (sessionCategories.length > 0 && sessionWebsites.length > 0) {
      setCategories(sessionCategories);
      setWebsites(sessionWebsites);
    } else {
      await getProjectDetails(projects[0].id);
    }
  };

  const getProjectDetails = async (projectId: string) => {
    const result = await fetchProjectDetails(projectId);
    if (result.status === 'success' && result.data) {
      const project = result.data;
      setSessionCategories(project.categories);
      setSessionWebsites(project.websites);
      setCategories(project.categories);
      setWebsites(project.websites);
    }
  };

  const setProjectData = (projects: Project[]) => {
    setProjects(projects);
    setSelectedProject(projects[0]);
    addProjectQueryParam(projects[0].title);
    setSessionProjects(projects);
  };

  // const loadMockData = () => {
  //   setIsProjectLoading(false);
  //   setIsCategoriesLoading(false);
  //   setIsWebsitesLoading(false);
  //   setProjects(mockProjects);
  //   setCategories(mockCategories);
  //   setWebsites(mockWebsites);
  // };

  const blockRef = useRef<boolean>(true);
  useEffect(() => {
    const loadProjects = async () => {
      setIsProjectLoading(true);
      try {
        const { sessionProjects } = getSessionData();
        if (sessionProjects?.length > 0) {
          await loadProjectData(sessionProjects);
        } else {
          const result = await fetchGetAllProjects();
          if (result.status === 'success' && result.data) {
            const projects = result.data;
            await loadProjectData(projects);
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
    // if (blockRef.current) loadMockData();
  }, []);

  const addProject = async (title: string, categories: string[]) => {
    try {
      setIsProjectLoading(true);
      const result = await fetchCreateProject(title, categories);
      if (result.status === 'success' && result.data) {
        const newProject = result.data;
        setProjects((prevProjects: Project[]) => {
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

  const deleteProject = async (projectId: string) => {
    setIsProjectLoading(true);
    try {
      const result = await fetchDeleteProject(projectId);
      if (result.status === 'error') {
        console.error('Error deleting project:', result.error);
        return null;
      }
      setProjects((prevProjects: Project[]) => {
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
        const result = await fetchCreateCategory(title, selectedProject.id);
        if (result.status === 'success' && result.data) {
          const newCategory = result.data;
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

  const deleteCategory = async (categoryId: string): Promise<string | null> => {
    setIsCategoriesLoading(true);
    try {
      if (selectedProject && selectedProject.id) {
        const result = await fetchDeleteCategory(categoryId, selectedProject.id);
        if (result.status === 'error') {
          console.error('Error deleting category:', result.error);
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
      const result = await fetchCreateWebsite(newWebsite, selectedProject.id);
      if (result.status === 'success' && result.data) {
        const createdWebsite = result.data;
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

  const deleteWebsite = async (websiteId: string): Promise<string | null> => {
    setIsWebsitesLoading(true);
    try {
      console.log("2", websiteId)
      const result = await fetchDeleteWebsite(websiteId);
      console.log("3", result)
      if (result.status === 'error') {
        console.error('Error deleting website:', result.error);
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
