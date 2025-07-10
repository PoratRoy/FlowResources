import mongoose, { Document, Schema } from 'mongoose';
import { ICategory } from './category.model';

export interface IProject extends Document {
  title: string;
  categories: mongoose.Types.ObjectId[] | ICategory[];
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>({
  title: { 
    type: String, 
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters'],
    unique: true,
    index: true
  },
  categories: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Category'
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for websites associated with this project
projectSchema.virtual('websites', {
  ref: 'Website',
  localField: '_id',
  foreignField: 'project',
  justOne: false
});

projectSchema.virtual('formattedCreatedAt').get(function() {
  return this.createdAt.toLocaleDateString();
});

// Method to add a category to a project
projectSchema.methods.addCategory = async function(categoryId: mongoose.Types.ObjectId) {
  if (!this.categories.includes(categoryId)) {
    this.categories.push(categoryId);
    await this.save();
  }
  return this;
};

// Method to remove a category from a project
projectSchema.methods.removeCategory = async function(categoryId: mongoose.Types.ObjectId) {
  this.categories = this.categories.filter(
    (id: mongoose.Types.ObjectId) => id.toString() !== categoryId.toString()
  );
  await this.save();
  return this;
};

export const Project = mongoose.models.Project as mongoose.Model<IProject> || 
  mongoose.model<IProject>('Project', projectSchema);
