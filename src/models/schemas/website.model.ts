import mongoose, { Document, Schema } from 'mongoose';
import validator from 'validator';

export interface IWebsite extends Document {
  title: string;
  description: string;
  url: string;
  image: string;
  category: mongoose.Types.ObjectId;
  project: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const websiteSchema = new Schema<IWebsite>({
  title: { 
    type: String, 
    required: [true, 'Website title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: { 
    type: String, 
    required: [true, 'Website description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  url: { 
    type: String, 
    required: [true, 'Website URL is required'],
    trim: true,
    validate: {
      validator: (value: string) => validator.isURL(value, { require_protocol: true }),
      message: 'Please provide a valid URL with protocol (http:// or https://)'
    }
  },
  image: { 
    type: String, 
    required: [true, 'Website image URL is required'],
    trim: true,
    validate: {
      validator: (value: string) => validator.isURL(value),
      message: 'Please provide a valid image URL'
    }
  },
  category: { 
    type: Schema.Types.ObjectId, 
    ref: 'Category', 
    required: [true, 'Category is required'],
    index: true
  },
  project: { 
    type: Schema.Types.ObjectId, 
    ref: 'Project', 
    required: [true, 'Project is required'],
    index: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create compound index for faster queries
websiteSchema.index({ project: 1, category: 1 });

websiteSchema.methods.isValidUrl = function(): boolean {
  return validator.isURL(this.url, { require_protocol: true });
};

websiteSchema.virtual('formattedCreatedAt').get(function() {
  return this.createdAt.toLocaleDateString();
});

export const Website = mongoose.models.Website as mongoose.Model<IWebsite> || 
  mongoose.model<IWebsite>('Website', websiteSchema);
