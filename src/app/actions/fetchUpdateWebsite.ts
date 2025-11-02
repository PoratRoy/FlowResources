'use server';

import mongoose from 'mongoose';
import { connectDB } from '@/lib/mongoConnection';
import { Website } from '@/models/types/website';
import { Website as WebsiteModel } from '@/models/schemas/website.model';
import { ActionResponse } from '@/models/types/actions';
import msgs from '@/models/resources/messages';

const fetchUpdateWebsite = async (
  websiteId: string,
  websiteData: Partial<Omit<Website, 'id' | 'url'>>
): Promise<ActionResponse<Website>> => {
  try {
    await connectDB();
    
    // Find the website by ID
    const website = await WebsiteModel.findById(websiteId);
    if (!website) {
      console.error(msgs.website.notFound);
      return { status: 'error', error: msgs.website.notFound };
    }

    // Update the website fields (excluding url which cannot be changed)
    if (websiteData.title) website.title = websiteData.title;
    if (websiteData.description) website.description = websiteData.description;
    if (websiteData.category) website.category = new mongoose.Types.ObjectId(websiteData.category);
    if (websiteData.icon) website.icon = websiteData.icon;
    website.image = websiteData.image || '';
    website.color = websiteData.color || '';

    // Save the updated website
    await website.save();

    // Return the formatted website data
    const formattedWebsite = website.toFormattedJSON
      ? website.toFormattedJSON()
      : {
          id: website._id ? website._id.toString() : '',
          title: website.title,
          description: website.description,
          url: website.url,
          image: website.image,
          icon: website.icon,
          color: website.color,
          category: website.category.toString(),
        };

    return {
      status: 'success',
      data: formattedWebsite as Website,
    };
  } catch (error) {
    console.error('Error updating website:', error);
    return { status: 'error', error: 'Failed to update website' };
  }
};

export default fetchUpdateWebsite;
