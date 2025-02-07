import {
  addCategoryToProject,
  createCategory,
  createProject,
  createProjectCategories,
  createWebsite,
  deleteCategory,
  deleteCategoryFromProject,
  deleteProject,
  deleteWebsite,
  getAllProjects,
  getCategoriesByProjectId,
  getCategoryById,
  getProjectById,
  getProjectCategory,
  getWebsitesByCategoryId,
  getWebsitesByProjectId,
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
    const defaultCategoryIds = [1, 2, 3];
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

export const fetchDeleteProject = async (projectId: number) => {
  try {
    // get all categories associated with the project
    const { data: categories, error: categoriesError } = await getCategoriesByProjectId(projectId);
    if (categoriesError) {
      console.error('Error getting project categories:', categoriesError);
      return categoriesError;
    }

    // delete all categories associated with the project
    const categoriesErrors = await Promise.all(categories.map((category: Category) => deleteCategoryFromProject(category.id, projectId)));
    if (categoriesErrors.some((error) => error)) {
      console.error('Error deleting project categories:', categoriesErrors);
      return categoriesErrors.find((error) => error);
    }

    // get all websites associated with the project
    const { data: websites, error: websitesError } = await getWebsitesByProjectId(projectId);
    if (websitesError || !websites) {
      console.error('Error getting project websites:', websitesError);
      return websitesError;
    }

    // delete all websites associated with the project
    const websiteErrors = await Promise.all(websites.map((website: Website) => deleteWebsite(website.id)));
    if (websiteErrors.some((error) => error)) {
      console.error('Error deleting project websites:', websiteErrors);
      return websiteErrors.find((error) => error);
    }

    // delete the project
    const error = await deleteProject(projectId);
    if (error) {
      console.error('Error deleting project:', error);
      return error;
    }
    return null;
  } catch (error) {
    console.error('Error deleting project:', error);
    return error;
  }
};

export const fetchProjectDetails = async (projectId: number) => {
  try {
    // Fetch websites for the project
    const { data: websites, error: websitesError } = await getWebsitesByProjectId(projectId);
    if (websitesError) {
      console.error('Error fetching project websites:', websitesError);
      return null;
    }

    // Fetch categories through project_categories
    const { data: projectCategories, error: categoriesError } = await getCategoriesByProjectId(
      projectId
    );
    if (categoriesError) {
      console.error('Error fetching project categories:', categoriesError);
      return null;
    }

    // Map the response to Category type
    const categories = (projectCategories || []).map((pc: any) => ({
      id: pc.categories.id,
      title: pc.categories.title,
    }));

    return {
      websites: websites || [],
      categories,
    };
  } catch (error) {
    console.error('Error fetching project details:', error);
    return null;
  }
};

export const fetchCreateCategory = async (
  title: string,
  projectId: number
): Promise<Category | null> => {
  try {
    const { data: category, error: categoryError } = await createCategory(title);
    if (categoryError || !category) {
      console.error('Error creating category:', categoryError);
      return null;
    }

    const error = await addCategoryToProject(category.id, projectId);
    if (error) {
      console.error('Error adding category to project:', error);
      return null;
    }

    return category;
  } catch (error) {
    console.error('Error creating category:', error);
    return null;
  }
};

export const fetchDeleteCategory = async (categoryId: number, projectId: number) => {
  try {
    const connectionError = await deleteCategoryFromProject(categoryId, projectId);
    if (connectionError) {
      console.error('Error deleting category from project:', connectionError);
      return connectionError;
    }

    const { data: websites, error: websitesError } = await getWebsitesByCategoryId(categoryId);
    if (websitesError || !websites) {
      console.error('Error getting category websites:', websitesError);
      return websitesError;
    }

    const websiteErrors = await Promise.all(websites.map((website: Website) => deleteWebsite(website.id)));
    if (websiteErrors.some((error) => error)) {
      console.error('Error deleting category websites:', websiteErrors);
      return websiteErrors.find((error) => error);
    }

    const categoryError = await deleteCategory(categoryId);
    if (categoryError) {
      console.error('Error deleting category:', categoryError);
      return categoryError;
    }
    return null;
  } catch (error) {
    console.error('Error deleting category:', error);
    return error;
  }
};

export const fetchCreateWebsite = async (
  websiteData: Omit<Website, 'id'>,
  projectId: number
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

export const fetchDeleteWebsite = async (websiteId: number) => {
  try {
    const error = await deleteWebsite(websiteId);
    if (error) {
      console.error('Error deleting website:', error);
      return error;
    }
    return null;
  } catch (error) {
    console.error('Error deleting website:', error);
    return error;
  }
};
