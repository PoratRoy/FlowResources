import { connectDB } from '@/lib/mongoConnection';
import { IWebsite, Website as WebsiteModel } from '@/models/schemas/website.model';
import { ProjectCategory } from '@/models/schemas/projectCategory.model';
import { Category as CategoryModel } from '@/models/schemas/category.model';

const fetchProjectDetails = async (projectId: string) => {
  try {
    await connectDB();
    
    // Fetch websites for the project
    const websites = await WebsiteModel.find({ project: projectId });
    if (!websites) {
      console.error('Error fetching project websites');
      return null;
    }
    
    // Format websites according to the expected type
    const formattedWebsites = websites.map((website: IWebsite) => ({
      id: website._id ? website._id.toString() : '',
      title: website.title,
      description: website.description,
      url: website.url,
      image: website.image,
      category: typeof website.category === 'string' ? website.category : website.category.toString()
    }));

    // Fetch categories through project_categories
    const projectCategories = await ProjectCategory.find({ project: projectId }).populate('category');
    if (!projectCategories) {
      console.error('Error fetching project categories');
      return null;
    }

    // Map the response to Category type
    const categories = projectCategories.map((pc: any) => ({
      id: pc.category._id.toString(),
      title: pc.category.title,
    }));

    return {
      websites: formattedWebsites || [],
      categories,
    };
  } catch (error) {
    console.error('Error fetching project details:', error);
    return null;
  }
};

export default fetchProjectDetails;