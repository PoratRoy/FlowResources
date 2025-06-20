'use server';

import { connectDB } from '@/lib/mongoConnection';
import { Category as CategoryModel } from '@/models/schemas/category.model';
import { Project as ProjectModel } from '@/models/schemas/project.model';
import { Website as WebsiteModel } from '@/models/schemas/website.model';
import { ActionResponse } from '@/models/types/actions';
import { Category } from '@/models/types/category';

const fetchDeleteCategory = async (
  categoryId: string,
  projectId: string
): Promise<ActionResponse<Category>> => {
  try {
    await connectDB();

    // First, remove the category from the project
    const success = await removeCategoryFromProject(projectId, categoryId);

    if (!success) {
      console.error('Error removing category from project');
      return { status: 'error', error: 'Error removing category from project' };
    }

    // Check if the category is used in any other projects
    const categoryInOtherProjects = await ProjectModel.findOne({ categories: categoryId });

    // If not used in other projects, delete the category
    if (!categoryInOtherProjects) {
      // Delete all websites with this category
      await WebsiteModel.deleteMany({ category: categoryId });

      // Now delete the category itself
      const deleteCategoryResult = await CategoryModel.deleteOne({ _id: categoryId });

      if (!deleteCategoryResult || deleteCategoryResult.deletedCount === 0) {
        console.error('Error deleting category');
        return { status: 'error', error: 'Error deleting category' };
      }
    } else {
      await WebsiteModel.deleteMany({
        category: categoryId,
        project: projectId,
      });
    }

    return { status: 'success' };
  } catch (error) {
    console.error('Error deleting category:', error);
    return { status: 'error', error: 'Error deleting category' };
  }
};

export default fetchDeleteCategory;

/**
 * Remove a category from a project
 */
async function removeCategoryFromProject(projectId: string, categoryId: string): Promise<boolean> {
  try {
    await connectDB();
    const project = await ProjectModel.findById(projectId);
    if (!project) return false;

    // Remove category from project
    project.categories = project.categories.filter(
      (cat: any) => cat.toString && cat.toString() !== categoryId
    ) as any;

    await project.save();

    // Handle websites with this category in this project
    // You can either delete them or reassign them to another category
    await WebsiteModel.deleteMany({
      project: projectId,
      category: categoryId,
    });

    return true;
  } catch (error) {
    console.error('Error removing category from project:', error);
    return false;
  }
}
