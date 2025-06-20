import mongoose, { Document, Schema } from 'mongoose';
import { IProject } from './project.model';
import { ICategory } from './category.model';

export interface IProjectCategory extends Document {
  project: mongoose.Types.ObjectId | IProject;
  category: mongoose.Types.ObjectId | ICategory;
  createdAt: Date;
  updatedAt: Date;
}

const projectCategorySchema = new Schema<IProjectCategory>({
  project: { 
    type: Schema.Types.ObjectId, 
    ref: 'Project', 
    required: [true, 'Project reference is required'],
    index: true
  },
  category: { 
    type: Schema.Types.ObjectId, 
    ref: 'Category', 
    required: [true, 'Category reference is required'],
    index: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

projectCategorySchema.index({ project: 1, category: 1 }, { unique: true });

projectCategorySchema.pre('save', async function(next) {
  const Project = mongoose.model('Project');
  const Category = mongoose.model('Category');
  
  try {
    const [projectExists, categoryExists] = await Promise.all([
      Project.exists({ _id: this.project }),
      Category.exists({ _id: this.category })
    ]);
    
    if (!projectExists) {
      return next(new Error('Referenced project does not exist'));
    }
    
    if (!categoryExists) {
      return next(new Error('Referenced category does not exist'));
    }
    
    next();
  } catch (error) {
    next(error as Error);
  }
});

export const ProjectCategory = mongoose.models.ProjectCategory as mongoose.Model<IProjectCategory> || 
  mongoose.model<IProjectCategory>('ProjectCategory', projectCategorySchema);
