'use server';

import msgs from '@/models/resources/messages';
import { connectDB } from '@/lib/mongoConnection';
import { IWebsite, Website as WebsiteModel } from '@/models/schemas/website.model';
import { Project as ProjectModel } from '@/models/schemas/project.model';
import { ActionResponse } from '@/models/types/actions';
import { Project } from '@/models/types/project';
import { Website } from '@/models/types/website';
import { Category } from '@/models/types/category';

const fetchProjectDetails = async (projectId: string): Promise<ActionResponse<Project>> => {
  try {
    await connectDB();

    // Fetch project with populated categories
    const project = await ProjectModel.findById(projectId).populate('categories');
    if (!project) {
      console.error(msgs.project.notFound);
      return { status: 'error', error: msgs.project.notFound };
    }

    // Fetch websites for the project
    const websites = await WebsiteModel.find({ project: projectId });
    if (!websites) {
      console.error(msgs.website.getError);
      return { status: 'error', error: msgs.website.getError };
    }

    // Format websites according to the expected type
    const formattedWebsites: Website[] = websites.map((website: IWebsite) => ({
      id: website._id ? website._id.toString() : '',
      title: website.title,
      description: website.description,
      url: website.url,
      image: website.image,
      category: website.category
        ? typeof website.category === 'string'
          ? website.category
          : website.category.toString()
        : '',
    }));

    // Map the categories to the expected type
    const categories: Category[] = project.categories.map((category: any) => ({
      id: category._id ? category._id.toString() : '',
      title: category.title,
    }));

    return {
      status: 'success',
      data: {
        id: project._id ? project._id.toString() : '',
        title: project.title,
        websites: formattedWebsites,
        categories: categories,
      } as Project,
    };
  } catch (error) {
    console.error(msgs.project.getError);
    return { status: 'error', error: msgs.project.getError };
  }
};

export default fetchProjectDetails;
