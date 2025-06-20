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

categorySchema.virtual('projects', {
  ref: 'ProjectCategory',
  localField: '_id',
  foreignField: 'category',
  justOne: false
});

categorySchema.virtual('websites', {
  ref: 'Website',
  localField: '_id',
  foreignField: 'category',
  justOne: false
});

categorySchema.virtual('formattedCreatedAt').get(function() {
  return this.createdAt.toLocaleDateString();
});

export const Category = mongoose.models.Category as mongoose.Model<ICategory> || 
  mongoose.model<ICategory>('Category', categorySchema);
