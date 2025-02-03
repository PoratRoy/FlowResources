import { Project } from '@/models/types/project';
import { Website } from '@/models/types/website';
import { Category } from '@/models/types/category';
import { revalidatePath } from 'next/cache';
import { supabase } from './supabase';

export async function createProject(title: string): Promise<Project | null> {
  try {
    // First create the project
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .insert([{ title }])
      .select()
      .single();

    if (projectError) {
      console.error('Error creating project:', projectError);
      return null;
    }

    // Add default categories to the project
    const defaultCategoryIds = ['1', '2', '3'];
    const projectCategories = defaultCategoryIds.map((categoryId) => ({
      project_id: project.id,
      category_id: categoryId,
    }));

    const { error: categoriesError } = await supabase
      .from('project_categories')
      .insert(projectCategories);

    if (categoriesError) {
      console.error('Error adding project categories:', categoriesError);
      return null;
    }

    return {
      id: project.id,
      title: project.title,
      websites: [],
      categories: [],
    } as Project;
  } catch (error) {
    console.error('Error creating project:', error);
    return null;
  }
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    const { data, error } = await supabase.from('projects').select('id, title');

    if (error) {
      console.error('Error fetching projects:', error);
      return [];
    }

    return data.map((project) => ({
      ...project,
      websites: [],
      categories: [],
    })) as Project[];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

// export async function createWebsite(
//   websiteData: Omit<Website, 'id'>,
//   projectId: string
// ): Promise<Website | null> {
//   try {
//     // First verify the category belongs to the project
//     const { data: projectCategory, error: categoryCheckError } = await supabase
//       .from('project_categories')
//       .select()
//       .match({ project_id: projectId, category_id: websiteData.category })
//       .single();

//     if (categoryCheckError || !projectCategory) {
//       console.error('Category does not belong to project:', categoryCheckError);
//       throw new Error('Category must belong to the project');
//     }

//     // If category check passes, create the website
//     const { data, error } = await supabase
//       .from('websites')
//       .insert([{ ...websiteData, project_id: projectId }])
//       .select()
//       .single();

//     if (error) {
//       console.error('Error creating website:', error);
//       return null;
//     }

//     return data as Website;
//   } catch (error) {
//     console.error('Error creating website:', error);
//     return null;
//   }
// }

export async function createWebsite(websiteData: Omit<Website, 'id'>, projectId: string) {
  try {
    // First, verify that the project exists
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('id')
      .eq('id', projectId)
      .single();

    if (projectError || !project) {
      console.error('Project not found');
      return null;
    }

    // Verify that the category exists
    const { data: category, error: categoryError } = await supabase
      .from('categories')
      .select('id')
      .eq('id', websiteData.category)
      .single();

    if (categoryError || !category) {
      console.error('Category not found');
      return null;
    }

    // Check if project and category are already linked in project_categories
    const { data: projectCategory, error: linkError } = await supabase
      .from('project_categories')
      .select('id')
      .eq('project_id', projectId)
      .eq('category_id', websiteData.category)
      .single();

    // If no link exists, create it
    if (!projectCategory && !linkError) {
      return null;
    }

    // Create the website
    const { data: website, error: websiteError } = await supabase
      .from('websites')
      .insert([{ ...websiteData, category_id: websiteData.category, project_id: projectId }])
      .select()
      .single();

    if (websiteError) {
      throw websiteError;
    }

    // Revalidate the projects page to show the new website
    revalidatePath('/projects');

    return { success: true, data: website };
  } catch (error) {
    console.error('Error creating website:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An error occurred while creating the website',
    };
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
