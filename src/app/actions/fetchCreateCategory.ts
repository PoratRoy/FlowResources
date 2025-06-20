import { connectDB } from '@/lib/mongoConnection';
import { Category as CategoryModel } from '@/models/schemas/category.model';
import { ProjectCategory } from '@/models/schemas/projectCategory.model';
import { Category } from '@/models/types/category';

const fetchCreateCategory = async (title: string, projectId: string): Promise<Category | null> => {
  try {
    await connectDB();
    const category = await CategoryModel.create({ title });

    if (!category) {
      console.error('Error creating category');
      return null;
    }

    await ProjectCategory.create({
      project: projectId,
      category: category.id
    });

    return {
      id: category.id,
      title: category.title,
    } as Category;
  } catch (error) {
    console.error('Error creating category:', error as Error);
    return null;
  }
};

export default fetchCreateCategory;
