import { Project } from '@/models/types/project';
import { Website } from '@/models/types/website';
import { supabase } from './supabase';

export async function createProject(title: string): Promise<Project | null> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .insert([{ title }])
      .select()
      .single();

    if (error) {
      console.error('Error creating project:', error);
      return null;
    }

    return {
      id: data.id,
      title: data.title,
      websites: []
    } as Project;
  } catch (error) {
    console.error('Error creating project:', error);
    return null;
  }
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('id, title');

    if (error) {
      console.error('Error fetching projects:', error);
      return [];
    }

    return data.map(project => ({
      ...project,
      websites: []
    })) as Project[];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function createWebsite(websiteData: Omit<Website, 'id'>): Promise<Website | null> {
  try {
    const { data, error } = await supabase
      .from('websites')
      .insert([websiteData])
      .select()
      .single();

    if (error) {
      console.error('Error creating website:', error);
      return null;
    }

    return data as Website;
  } catch (error) {
    console.error('Error creating website:', error);
    return null;
  }
}

export async function fetchWebsites(): Promise<Website[]> {
  try {
    const { data, error } = await supabase
      .from('websites')
      .select('*');

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
