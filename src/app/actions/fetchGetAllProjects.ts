import { Project } from '@/models/types/project';
import { IProject, Project as ProjectModal } from '@/models/schemas/project.model';
import { connectDB } from '@/lib/mongoConnection';

const fetchGetAllProjects = async (): Promise<Project[]> => {
  try {
    await connectDB();
    const projects = await ProjectModal.find();

    if (!projects) {
      console.error('Error getting projects:');
      return [];
    }

    return projects.map((project: IProject) => ({
      id: project._id ? project._id.toString() : '',
      title: project.title,
    })) as Project[];
  } catch (error) {
    console.error('Error getting projects:', error);
    return [];
  }
};

export default fetchGetAllProjects;
