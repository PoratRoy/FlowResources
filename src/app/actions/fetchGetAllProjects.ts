"use server";

import { Project } from '@/models/types/project';
import { IProject, Project as ProjectModel } from '@/models/schemas/project.model';
import { connectDB } from '@/lib/mongoConnection';
import { ActionResponse } from '@/models/types/actions';

const fetchGetAllProjects = async (): Promise<ActionResponse<Project[]>> => {
  try {
    await connectDB();
    const projects = await ProjectModel.find();

    if (!projects) {
      console.error('Error getting projects:');
      return { status: 'error', error: 'Error getting projects' };
    }

    return {
      status: 'success',
      data: projects.map((project: IProject) => ({
        id: project._id ? project._id.toString() : '',
        title: project.title,
      })) as Project[],
    };
  } catch (error) {
    console.error('Error getting projects:', error);
    return { status: 'error', error: 'Error getting projects' };
  }
};

export default fetchGetAllProjects;
