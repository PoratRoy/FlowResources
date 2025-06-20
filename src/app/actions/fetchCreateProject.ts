'use server';

import { connectDB } from '@/lib/mongoConnection';
import { Project as ProjectModel } from '@/models/schemas/project.model';
import { Project } from '@/models/types/project';
import fetchCreateCategory from '@/app/actions/fetchCreateCategory';
import { ActionResponse } from '@/models/types/actions';
import msgs from '@/models/resources/messages';

const fetchCreateProject = async (
  title: string,
  categories: string[]
): Promise<ActionResponse<Project>> => {
  try {
    await connectDB();
    const project = await ProjectModel.create({ title });
    if (!project) {
      console.error(msgs.project.createError);
      return { status: 'error', error: msgs.project.createError };
    }

    // initialize default categories
    await Promise.all(categories.map((category) => fetchCreateCategory(category, project.id)));

    return {
      status: 'success',
      data: {
        id: project.id,
        title: project.title,
      } as Project,
    };
  } catch (error) {
    console.error(`${msgs.project.createError}:`, error as Error);
    return { status: 'error', error: msgs.project.createError };
  }
};

export default fetchCreateProject;
