'use server';

import { Project } from '@/models/types/project';
import { IProject, Project as ProjectModel } from '@/models/schemas/project.model';
import { connectDB } from '@/lib/mongoConnection';
import { ActionResponse } from '@/models/types/actions';
import msgs from '@/models/resources/messages';

const fetchGetAllProjects = async (): Promise<ActionResponse<Project[]>> => {
  try {
    await connectDB();
    const projects = await ProjectModel.find();

    if (!projects) {
      console.error(msgs.project.getError);
      return { status: 'error', error: msgs.project.getError };
    }

    return {
      status: 'success',
      data: projects.map((project: IProject) => ({
        id: project._id ? project._id.toString() : '',
        title: project.title,
      })) as Project[],
    };
  } catch (error) {
    console.error(`${msgs.project.getError}:`, error as Error);
    return { status: 'error', error: msgs.project.getError };
  }
};

export default fetchGetAllProjects;
