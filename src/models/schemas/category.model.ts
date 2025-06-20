import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>({
  title: { 
    type: String, 
    required: [true, 'Category title is required'],
    trim: true,
    maxlength: [50, 'Title cannot exceed 50 characters'],
    index: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for projects that include this category
categorySchema.virtual('projects', {
  ref: 'Project',
  localField: '_id',
  foreignField: 'categories',
  justOne: false
});

// Virtual for websites associated with this category
categorySchema.virtual('websites', {
  ref: 'Website',
  localField: '_id',
  foreignField: 'category',
  justOne: false
});

categorySchema.virtual('formattedCreatedAt').get(function() {
  return this.createdAt.toLocaleDateString();
});

// Method to handle cascading operations when a category is deleted
categorySchema.methods.handleCascadeDelete = async function(this: ICategory): Promise<void> {
  try {
    // Find all projects that reference this category and update them
    const Project = mongoose.model('Project');
    await Project.updateMany(
      { categories: this._id },
      { $pull: { categories: this._id } }
    );
    
    // Find all websites that reference this category and handle them
    const Website = mongoose.model('Website');
    await Website.deleteMany({ category: this._id });
  } catch (error) {
    console.error('Error in cascade delete:', error);
    throw error;
  }
};

export const Category = mongoose.models.Category as mongoose.Model<ICategory> || 
  mongoose.model<ICategory>('Category', categorySchema);
