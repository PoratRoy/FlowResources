import { connectDB } from '@/lib/mongoConnection';
import { IProjectCategory, ProjectCategory } from '@/models/schemas/projectCategory.model';
import { IWebsite, Website as WebsiteModal } from '@/models/schemas/website.model';
import { Project as ProjectModal } from '@/models/schemas/project.model';
import { DeleteResult } from 'mongoose';

const fetchDeleteProject = async (projectId: string) => {
  try {
    await connectDB();

    // get all categories associated with the project
    const categories = await ProjectCategory.find({ project: projectId }).populate(
      'category',
      'id title'
    );
    if (!categories) {
      console.error('Error getting project categories:');
      return null;
    }

    // delete all categories associated with the project
    const categoriesErrors = await Promise.all(
      categories.map((category: IProjectCategory) =>
        ProjectCategory.deleteOne({
          project: projectId,
          category: category.id,
        })
      )
    );
    if (categoriesErrors.some((error: DeleteResult) => error)) {
      console.error('Error deleting project categories:', categoriesErrors);
      return categoriesErrors.find((error: DeleteResult) => error);
    }

    // get all websites associated with the project
    const websites = await WebsiteModal.find({ project: projectId });
    if (!websites) {
      console.error('Error getting project websites:');
      return null;
    }

    // delete all websites associated with the project
    const websiteErrors = await Promise.all(
      websites.map((website: IWebsite) => WebsiteModal.deleteOne({ _id: website._id }))
    );
    if (websiteErrors.some((error: DeleteResult) => error)) {
      console.error('Error deleting project websites:', websiteErrors);
      return websiteErrors.find((error: DeleteResult) => error);
    }

    // delete the project
    const result = await ProjectModal.deleteOne({ _id: projectId });
    if (result.deletedCount === 0) {
      console.error('Error deleting project:', result);
      return result;
    }
    return null;
  } catch (error) {
    console.error('Error deleting project:', error);
    return error;
  }
};

export default fetchDeleteProject;
