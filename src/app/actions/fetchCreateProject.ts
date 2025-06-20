'use server';

import { connectDB } from '@/lib/mongoConnection';
import { Project as ProjectModel } from '@/models/schemas/project.model';
import { Project } from '@/models/types/project';
import fetchCreateCategory from '@/app/actions/fetchCreateCategory';

const fetchCreateProject = async (title: string, categories: string[]): Promise<Project | null> => {
  try {
    await connectDB();
    const project = await ProjectModel.create({ title });
    if (!project) {
      console.error('Error creating project');
      return null;
    }

    // initialize default categories
    await Promise.all(categories.map((category) => fetchCreateCategory(category, project.id)));

    return {
      id: project.id,
      title: project.title,
    } as Project;
  } catch (error) {
    console.error('Error creating project:', error as Error);
    return null;
  }
};

export default fetchCreateProject;
