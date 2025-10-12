import mongoose, { Document, Schema } from 'mongoose';
import validator from 'validator';
import { ICategory } from './category.model';
import { IProject } from './project.model';
import { pricingBadgesArray, usageBadgesArray } from '../constants/badeges';

export interface IWebsite extends Document {
  title: string;
  description: string;
  url: string;
  image: string;
  icon?: string;
  color?: string;
  pricing: string;
  websiteType: string;
  usage?: string;
  category: mongoose.Types.ObjectId | ICategory;
  project: mongoose.Types.ObjectId | IProject;
  createdAt: Date;
  updatedAt: Date;
  isValidUrl(): boolean;
  updateCategory(categoryId: mongoose.Types.ObjectId): Promise<IWebsite>;
  toFormattedJSON(): {
    id: string;
    title: string;
    description: string;
    url: string;
    image: string;
    icon?: string;
    color?: string;
    pricing: string;
    websiteType: string;
    usage?: string;
    category: string;
    project: string;
  };
}

const websiteSchema = new Schema<IWebsite>(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Website title is required'],
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [600, 'Description cannot exceed 600 characters'],
    },
    url: {
      type: String,
      required: [true, 'Website URL is required'],
      trim: true,
      validate: {
        validator: (value: string) => validator.isURL(value, { require_protocol: true }),
        message: 'Please provide a valid URL with protocol (http:// or https://)',
      },
    },
    image: {
      type: String,
      trim: true,
      validate: {
        validator: (value: string) => {
          return value === '' || validator.isURL(value);
        },
        message: 'Please provide a valid image URL',
      },
    },
    icon: {
      type: String,
      trim: true,
      required: false,
      validate: {
        validator: (value: string) => {
          return !value || value === '' || validator.isURL(value);
        },
        message: 'Please provide a valid icon URL',
      },
    },
    color: {
      type: String,
      trim: true,
      required: false,
      default: '#357ef3',
    },
    pricing: {
      type: String,
      enum: pricingBadgesArray,
      default: pricingBadgesArray[0],
    },
    usage: {
      type: String,
      enum: usageBadgesArray,
      default: usageBadgesArray[0],
      required: false,
    },
    websiteType: {
      type: String,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required'],
      index: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: [true, 'Project is required'],
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Create compound index for faster queries
websiteSchema.index({ project: 1, category: 1 });

websiteSchema.methods.isValidUrl = function (this: IWebsite): boolean {
  return validator.isURL(this.url, { require_protocol: true });
};

websiteSchema.virtual('formattedCreatedAt').get(function (this: IWebsite) {
  return this.createdAt.toLocaleDateString();
});

// Method to update website category
websiteSchema.methods.updateCategory = async function (
  this: IWebsite,
  categoryId: mongoose.Types.ObjectId
): Promise<IWebsite> {
  this.category = categoryId;
  return this.save();
};

// Method to get formatted data for frontend
websiteSchema.methods.toFormattedJSON = function (this: IWebsite) {
  return {
    id: this._id ? this._id.toString() : '',
    title: this.title,
    description: this.description,
    url: this.url,
    image: this.image,
    icon: this.icon,
    color: this.color,
    pricing: this.pricing,
    websiteType: this.websiteType,
    usage: this.usage,
    category: this.category
      ? typeof this.category === 'string'
        ? this.category
        : this.category.toString()
      : '',
    project: this.project
      ? typeof this.project === 'string'
        ? this.project
        : this.project.toString()
      : '',
  };
};

export const Website =
  (mongoose.models.Website as mongoose.Model<IWebsite>) ||
  mongoose.model<IWebsite>('Website', websiteSchema);
