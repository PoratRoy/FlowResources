import { connectDB } from '@/lib/mongoConnection';
import { Website } from '@/models/types/website';
import { Project as ProjectModal } from '@/models/schemas/project.model';
import { Category as CategoryModal } from '@/models/schemas/category.model';
import { IWebsite, Website as WebsiteModal } from '@/models/schemas/website.model';
import { ProjectCategory } from '@/models/schemas/projectCategory.model';

const fetchCreateWebsite = async (
  websiteData: Omit<Website, 'id'>,
  projectId: string,
  categoryId: string
): Promise<Website | null> => {
  try {
    await connectDB();
    const project = await ProjectModal.findById(projectId);
    if (!project) {
      console.error('Project not found');
      return null;
    }

    const category = await CategoryModal.findById(categoryId);
    if (!category) {
      console.error('Category not found');
      return null;
    }

    const projectCategory = await ProjectCategory.findOne({
      project: projectId,
      category: category.id,
    });
    if (!projectCategory) {
      console.error('Project category not found');
      return null;
    }

    const website = await WebsiteModal.create({
      ...websiteData,
      category: categoryId, // Use the actual categoryId from parameters
      project: projectId
    }) as IWebsite;

    if (!website) {
      console.error('Error creating website');
      return null;
    }

    return {
      id: (website._id as string).toString(),
      title: website.title,
      description: website.description,
      url: website.url,
      image: website.image,
      category: website.category.toString()
    } as Website;
  } catch (error) {
    console.error('Error creating website:', error);
    return null;
  }
};

export default fetchCreateWebsite;
