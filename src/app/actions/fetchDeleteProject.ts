"use server";

import { connectDB } from '@/lib/mongoConnection';
import { Website as WebsiteModel } from '@/models/schemas/website.model';
import { Project as ProjectModel } from '@/models/schemas/project.model';
import { Category as CategoryModel } from '@/models/schemas/category.model';
import { ActionResponse } from '@/models/types/actions';
import { Project } from '@/models/types/project';
import msgs from '@/models/resources/messages';

const fetchDeleteProject = async (projectId: string): Promise<ActionResponse<Project>> => {
  try {
    await connectDB();

    // Find the project to get its categories
    const project = await ProjectModel.findById(projectId).populate('categories');
    if (!project) {
      console.error(msgs.project.notFound);
      return { status: 'error', error: msgs.project.notFound };
    }

    // Delete all websites associated with this project
    const websiteDeleteResult = await WebsiteModel.deleteMany({ project: projectId });
    if (!websiteDeleteResult) {
      console.error(msgs.website.deleteError);
      return { status: 'error', error: msgs.website.deleteError };
    }

    // Get category IDs before deleting the project
    const categoryIds = project.categories.map((cat: any) => 
      cat._id ? cat._id.toString() : (typeof cat === 'string' ? cat : '')
    ).filter(Boolean);

    // Delete the project
    const projectDeleteResult = await ProjectModel.deleteOne({ _id: projectId });
    if (!projectDeleteResult || projectDeleteResult.deletedCount === 0) {
      console.error(msgs.project.deleteError);
      return { status: 'error', error: msgs.project.deleteError };
    }

    // Check if any categories are now orphaned (not used by any other projects)
    // and delete them if they are
    for (const categoryId of categoryIds) {
      const categoryInUse = await ProjectModel.findOne({ categories: categoryId });
      if (!categoryInUse) {
        // Category is not used by any other project, delete it
        await CategoryModel.deleteOne({ _id: categoryId });
      }
    }

    return { status: 'success' };
  } catch (error) {
    console.error(msgs.project.deleteError);
    return { status: 'error', error: msgs.project.deleteError };
  }
};

export default fetchDeleteProject;
