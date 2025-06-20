import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>({
  title: { 
    type: String, 
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters'],
    index: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

projectSchema.virtual('categories', {
  ref: 'ProjectCategory',
  localField: '_id',
  foreignField: 'project',
  justOne: false
});

projectSchema.virtual('websites', {
  ref: 'Website',
  localField: '_id',
  foreignField: 'project',
  justOne: false
});

projectSchema.virtual('formattedCreatedAt').get(function() {
  return this.createdAt.toLocaleDateString();
});

export const Project = mongoose.models.Project as mongoose.Model<IProject> || 
  mongoose.model<IProject>('Project', projectSchema);
