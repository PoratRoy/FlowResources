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
    project_id: number;
    category_id: number;
  }[]
): Promise<PostgrestError | null> {
  const { error } = await supabase.from('project_categories').insert(projectCategories);
  return error;
}

export async function getProjectById(
  projectId: number
): Promise<{ data: Project | null; error: PostgrestError | null }> {
  const { data, error } = await supabase
    .from('projects')
    .select('id, title')
    .eq('id', projectId)
    .single();
  return { data, error };
}

export async function deleteProject(projectId: number): Promise<PostgrestError | null> {
  const { error } = await supabase.from('projects').delete().eq('id', projectId);
  return error;
}

export async function getProjectCategory(
  projectId: number,
  categoryId: number
): Promise<{ data: any | null; error: PostgrestError | null }> {
  const { data, error } = await supabase
    .from('project_categories')
    .select('id')
    .eq('project_id', projectId)
    .eq('category_id', categoryId)
    .single();
  return { data, error };
}

export async function getCategoryById(categoryId: number): Promise<{
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

export async function addCategoryToProject(
  categoryId: number,
  projectId: number
): Promise<PostgrestError | null> {
  const { error } = await supabase
    .from('project_categories')
    .insert([{ project_id: projectId, category_id: categoryId }]);
  return error;
}

export async function getCategoriesByProjectId(
  projectId: number
): Promise<{ data: any; error: PostgrestError | null }> {
  const { data, error } = await supabase
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
  return { data, error };
}

export async function deleteCategoryFromProject(
  categoryId: number,
  projectId: number
): Promise<PostgrestError | null> {
  const { error } = await supabase
    .from('project_categories')
    .delete()
    .eq('project_id', projectId)
    .eq('category_id', categoryId);
  return error;
}

export async function createCategory(title: string) {
  const { data, error } = await supabase.from('categories').insert([{ title }]).select().single();
  return { data, error };
}

export async function deleteCategory(categoryId: number): Promise<PostgrestError | null> {
  const { error } = await supabase.from('categories').delete().eq('id', categoryId);
  return error;
}

export async function createWebsite(
  websiteData: Omit<Website, 'id'>,
  projectId: number
): Promise<{ data: Website | null; error: PostgrestError | null }> {
  const { data, error } = await supabase
    .from('websites')
    .insert([{ ...websiteData, category_id: websiteData.category, project_id: projectId }])
    .select()
    .single();
  return { data, error };
}

export async function deleteWebsite(websiteId: number): Promise<PostgrestError | null> {
  const { error } = await supabase.from('websites').delete().eq('id', websiteId);
  return error;
}

export async function getWebsitesByProjectId(
  projectId: number
): Promise<{ data: Website[] | null; error: PostgrestError | null }> {
  const { data, error } = await supabase.from('websites').select('*').eq('project_id', projectId);
  return { data, error };
}

export async function getWebsitesByCategoryId(
  categoryId: number
): Promise<{ data: Website[] | null; error: PostgrestError | null }> {
  const { data, error } = await supabase
    .from('websites')
    .select('*')
    .eq('category_id', categoryId);
  return { data, error };
}