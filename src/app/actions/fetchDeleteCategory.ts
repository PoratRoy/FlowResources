import { IWebsite } from '@/models/schemas/website.model';
import { Category as CategoryModal } from '@/models/schemas/category.model';
import { ProjectCategory } from '@/models/schemas/projectCategory.model';
import { Website as WebsiteModal } from '@/models/schemas/website.model';
import { DeleteResult } from 'mongoose';
import { connectDB } from '@/lib/mongoConnection';

const fetchDeleteCategory = async (categoryId: string, projectId: string) => {
  try {
    await connectDB();

    // Delete the category from project (ProjectCategory association)
    const projectCategoryResult = await ProjectCategory.deleteOne({
      category: categoryId,
      project: projectId
    });
    
    if (projectCategoryResult.deletedCount === 0) {
      console.error('Error deleting category from project:', projectCategoryResult);
      return projectCategoryResult;
    }

    // Find websites associated with this category
    const websites = await WebsiteModal.find({ category: categoryId });
    if (!websites) {
      console.error('Error getting category websites:');
      return null;
    }

    // Delete all websites associated with this category
    const websiteErrors = await Promise.all(
      websites.map((website: IWebsite) => WebsiteModal.deleteOne({ _id: website._id }))
    );
    if (websiteErrors.some((error: DeleteResult) => error)) {
      console.error('Error deleting project websites:', websiteErrors);
      return websiteErrors.find((error: DeleteResult) => error);
    }

    // Delete the category itself
    await CategoryModal.findByIdAndDelete(categoryId);
    
    // Clean up related records
    await ProjectCategory.deleteMany({ category: categoryId });
    await WebsiteModal.deleteMany({ category: categoryId });

    return null;
  } catch (error) {
    console.error('Error deleting category:', error);
    return error;
  }
};

export default fetchDeleteCategory;
