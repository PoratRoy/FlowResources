"use server";

import { connectDB } from "@/lib/mongoConnection";
import { Website as WebsiteModel } from "@/models/schemas/website.model";
import { ActionResponse } from "@/models/types/actions";
import { Website } from "@/models/types/website";

const fetchDeleteWebsite = async (websiteId: string): Promise<ActionResponse<Website>> => {
  try {
    await connectDB();
    const result = await WebsiteModel.deleteOne({ _id: websiteId });
    if (result.deletedCount === 0) {
      console.error('Error deleting website:', result);
      return { status: 'error', error: 'Website not found or could not be deleted' };
    }
    return { status: 'success' };
  } catch (error) {
    console.error('Error deleting website:', error);
    return { status: 'error', error: 'Error deleting website' };
  }
};

export default fetchDeleteWebsite;
