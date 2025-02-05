import {
  createCategory,
  createProject,
  createProjectCategories,
  createWebsite,
  getAllProjects,
  getCategoryById,
  getProjectById,
  getProjectCategory,
} from '@/lib/database';
import { Category } from '@/models/types/category';
import { Project } from '@/models/types/project';
import { Website } from '@/models/types/website';

export const fetchCreateProject = async (title: string): Promise<Project | null> => {
  try {
    const { data, error: projectError } = await createProject(title);
    if (projectError || !data) {
      console.error('Error creating project:', projectError);
      return null;
    }

    // Add default categories to the project
    const defaultCategoryIds = ['1', '2', '3'];
    const projectCategories = defaultCategoryIds.map((categoryId) => ({
      project_id: data.id,
      category_id: categoryId,
    }));

    const categoryError = await createProjectCategories(projectCategories);
    if (categoryError) {
      console.error('Error adding project categories:', categoryError);
      return null;
    }

    return {
      id: data.id,
      title: data.title,
    } as Project;
  } catch (error) {
    console.error('Error creating project:', error);
    return null;
  }
};

export const fetchGetAllProjects = async (): Promise<Project[]> => {
  try {
    const { data, error } = await getAllProjects();
    if (error || !data) {
      console.error('Error getting projects:', error);
      return [];
    }

    return data.map((project: Project) => ({
      ...project,
    })) as Project[];
  } catch (error) {
    console.error('Error getting projects:', error);
    return [];
  }
};

export const fetchCreateWebsite = async (
  websiteData: Omit<Website, 'id'>,
  projectId: string
): Promise<Website | null> => {
  try {
    const { data: project, error: projectError } = await getProjectById(projectId);
    if (projectError || !project) {
      console.error('Project not found');
      return null;
    }

    const { data: category, error: categoryError } = await getCategoryById(websiteData.category);
    if (categoryError || !category) {
      console.error('Category not found');
      return null;
    }

    const { data: projectCategory, error: linkError } = await getProjectCategory(
      projectId,
      category.id
    );
    if (linkError || !projectCategory) {
      console.error('Project category not found');
      return null;
    }

    const { data: website, error: websiteError } = await createWebsite(websiteData, projectId);
    if (websiteError || !website) {
      console.error('Error creating website:', websiteError);
      return null;
    }
    return website;
  } catch (error) {
    console.error('Error creating website:', error);
    return null;
  }
};

export const fetchCreateCategory = async (title: string): Promise<Category | null> => {
  try {
    const { data: category, error: categoryError } = await createCategory(title);
    if (categoryError || !category) {
      console.error('Error creating category:', categoryError);
      return null;
    }
    return category;
  } catch (error) {
    console.error('Error creating category:', error);
    return null;
  }
};