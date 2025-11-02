'use server';

import { connectDB } from '@/lib/mongoConnection';
import { Website } from '@/models/types/website';
import { Project as ProjectModel } from '@/models/schemas/project.model';
import { Category as CategoryModel } from '@/models/schemas/category.model';
import { IWebsite, Website as WebsiteModel } from '@/models/schemas/website.model';
import { ActionResponse } from '@/models/types/actions';
import msgs from '@/models/resources/messages';

const fetchCreateWebsite = async (
  websiteData: Omit<Website, 'id'>,
  projectId: string
): Promise<ActionResponse<Website>> => {
  const categoryId = websiteData.category;
  try {
    await connectDB();
    // Check if project exists
    const project = await ProjectModel.findById(projectId);
    if (!project) {
      console.error(msgs.project.notFound);
      return { status: 'error', error: msgs.project.notFound };
    }

    // Check if category exists
    const category = await CategoryModel.findById(categoryId);
    if (!category) {
      console.error(msgs.category.notFound);
      return { status: 'error', error: msgs.category.notFound };
    }

    // Check if the category is associated with the project
    const categoryInProject = project.categories.some(
      (cat: any) => cat.toString && cat.toString() === categoryId
    );

    if (!categoryInProject) {
      console.error(msgs.project.findCategoryError);
      return { status: 'error', error: msgs.project.findCategoryError };
    }

    // Create the website with the project and category references
    const website = (await WebsiteModel.create({
      ...websiteData,
      category: categoryId,
      project: projectId,
    })) as IWebsite;

    if (!website) {
      console.error(msgs.website.createError);
      return { status: 'error', error: msgs.website.createError };
    }

    const formattedWebsite = website.toFormattedJSON
      ? website.toFormattedJSON()
      : {
          id: website._id ? website._id.toString() : '',
          title: website.title,
          description: website.description,
          url: website.url,
          image: website.image,
          icon: website.icon,
          color: website.color,
          category: categoryId,
        };

    return {
      status: 'success',
      data: formattedWebsite as Website,
    };
  } catch (error) {
    console.error(`${msgs.website.createError}:`, error);
    return { status: 'error', error: msgs.website.createError };
  }
};

export default fetchCreateWebsite;
