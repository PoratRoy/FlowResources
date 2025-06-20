'use server';

import { connectDB } from '@/lib/mongoConnection';
import { Category as CategoryModel } from '@/models/schemas/category.model';
import { Project as ProjectModel } from '@/models/schemas/project.model';
import { Category } from '@/models/types/category';
import { ActionResponse } from '@/models/types/actions';
import mongoose from 'mongoose';
import msgs from '@/models/resources/messages';

const fetchCreateCategory = async (
  title: string,
  projectId: string
): Promise<ActionResponse<Category>> => {
  try {
    await connectDB();
    // Create the category
    const category = await CategoryModel.create({ title });

    if (!category) {
      console.error(msgs.category.createError);
      return { status: 'error', error: msgs.category.createError };
    }

    // Add the category to the project using our helper function
    const success = await addCategoryToProject(projectId, category.id);

    if (!success) {
      console.error(msgs.project.addCategory);
      // Delete the category if we couldn't add it to the project
      await CategoryModel.deleteOne({ _id: category.id });
      return { status: 'error', error: msgs.project.addCategory };
    }

    return {
      status: 'success',
      data: {
        id: category.id,
        title: category.title,
      } as Category,
    };
  } catch (error) {
    console.error(`${msgs.category.createError}:`, error as Error);
    return { status: 'error', error: msgs.category.createError };
  }
};

export default fetchCreateCategory;

/**
 * Add a category to a project
 */
async function addCategoryToProject(projectId: string, categoryId: string): Promise<boolean> {
  try {
    await connectDB();
    const project = await ProjectModel.findById(projectId);
    if (!project) return false;

    const category = await CategoryModel.findById(categoryId);
    if (!category) return false;

    // Check if category is already in project
    const categoryExists = project.categories.some(
      (cat: any) => cat.toString && cat.toString() === categoryId
    );

    if (!categoryExists) {
      project.categories.push(new mongoose.Types.ObjectId(categoryId) as any);
      await project.save();
    }

    return true;
  } catch (error) {
    console.error('Error adding category to project:', error);
    return false;
  }
}
