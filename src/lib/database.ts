import { Project } from '@/models/types/project';
import { Website } from '@/models/types/website';
import { Category } from '@/models/types/category';
import { supabase } from './supabase';
import { PostgrestError } from '@supabase/supabase-js';

export async function createProject(
  title: string
): Promise<{ data: Project | null; error: PostgrestError | null }> {
  const { data, error } = await supabase.from('projects').insert([{ title }]).select().single();
  return { data, error };
}

export async function createProjectCategories(
  projectCategories: {
    project_id: string;
    category_id: string;
  }[]
): Promise<PostgrestError | null> {
  const { error } = await supabase.from('project_categories').insert(projectCategories);
  return error;
}

export async function getProjectById(
  projectId: string
): Promise<{ data: Project | null; error: PostgrestError | null }> {
  const { data, error } = await supabase
    .from('projects')
    .select('id, title')
    .eq('id', projectId)
    .single();
  return { data, error };
}

export async function getProjectCategory(
  projectId: string,
  categoryId: string
): Promise<{ data: any | null; error: PostgrestError | null }> {
  const { data, error } = await supabase
    .from('project_categories')
    .select('id')
    .eq('project_id', projectId)
    .eq('category_id', categoryId)
    .single();
  return { data, error };
}

export async function getCategoryById(categoryId: string): Promise<{
  data: Omit<Category, 'title'> | null;
  error: PostgrestError | null;
}> {
  const { data, error } = await supabase
    .from('categories')
    .select('id')
    .eq('id', categoryId)
    .single();
  return { data, error };
}

export async function getAllProjects(): Promise<{
  data: Project[] | null;
  error: PostgrestError | null;
}> {
  const { data, error } = await supabase.from('projects').select('id, title');
  return { data, error };
}

export async function createWebsite(
  websiteData: Omit<Website, 'id'>,
  projectId: string
): Promise<{ data: Website | null; error: PostgrestError | null }> {
  const { data, error } = await supabase
    .from('websites')
    .insert([{ ...websiteData, category_id: websiteData.category, project_id: projectId }])
    .select()
    .single();
  return { data, error };
}

export async function createCategory(title: string, projectId: string) {
  const { data, error } = await supabase
    .from('categories')
    .insert([{ title }])
    .select()
    .single();
  return { data, error };
}

export async function addCategoryToProject(
  categoryId: string,
  projectId: string
): Promise<PostgrestError | null> {
  const { error } = await supabase
    .from('project_categories')
    .insert([{ project_id: projectId, category_id: categoryId }]);
  return error;
}

export async function fetchProjectDetails(
  projectId: string
): Promise<{ websites: Website[]; categories: Category[] } | null> {
  try {
    // Fetch websites for the project
    const { data: websites, error: websitesError } = await supabase
      .from('websites')
      .select('*')
      .eq('project_id', projectId);

    if (websitesError) {
      console.error('Error fetching project websites:', websitesError);
      return null;
    }

    // Fetch categories through project_categories
    const { data: projectCategories, error: categoriesError } = await supabase
      .from('project_categories')
      .select(
        `
        categories (
          id,
          title
        )
      `
      )
      .eq('project_id', projectId);

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
}

export async function fetchWebsites(): Promise<Website[]> {
  try {
    const { data, error } = await supabase.from('websites').select('*');

    if (error) {
      console.error('Error fetching websites:', error);
      return [];
    }

    return data as Website[];
  } catch (error) {
    console.error('Error fetching websites:', error);
    return [];
  }
}
