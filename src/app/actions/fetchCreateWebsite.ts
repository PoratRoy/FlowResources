"use server";

import { connectDB } from '@/lib/mongoConnection';
import { Website } from '@/models/types/website';
import { Project as ProjectModel } from '@/models/schemas/project.model';
import { Category as CategoryModel } from '@/models/schemas/category.model';
import { IWebsite, Website as WebsiteModel } from '@/models/schemas/website.model';
import { ActionResponse } from '@/models/types/actions';

const fetchCreateWebsite = async (
  websiteData: Omit<Website, 'id'>,
  projectId: string,
  categoryId: string
): Promise<ActionResponse<Website>> => {
  try {
    await connectDB();
    // Check if project exists
    const project = await ProjectModel.findById(projectId);
    if (!project) {
      console.error('Project not found');
      return { status: 'error', error: 'Project not found' };
    }

    // Check if category exists
    const category = await CategoryModel.findById(categoryId);
    if (!category) {
      console.error('Category not found');
      return { status: 'error', error: 'Category not found' };
    }

    // Check if the category is associated with the project
    const categoryInProject = project.categories.some(
      (cat: any) => cat.toString && cat.toString() === categoryId
    );
    
    if (!categoryInProject) {
      console.error('Category is not associated with this project');
      return { status: 'error', error: 'Category is not associated with this project' };
    }

    // Create the website with the project and category references
    const website = await WebsiteModel.create({
      ...websiteData,
      category: categoryId,
      project: projectId
    }) as IWebsite;

    if (!website) {
      console.error('Error creating website');
      return { status: 'error', error: 'Error creating website' };
    }

    const formattedWebsite = website.toFormattedJSON ? website.toFormattedJSON() : {
      id: website._id ? website._id.toString() : '',
      title: website.title,
      description: website.description,
      url: website.url,
      image: website.image,
      category: categoryId
    };
    
    return {
      status: 'success',
      data: formattedWebsite as Website,
    };
  } catch (error) {
    console.error('Error creating website:', error);
    return { status: 'error', error: 'Error creating website' };
  }
};

export default fetchCreateWebsite;
