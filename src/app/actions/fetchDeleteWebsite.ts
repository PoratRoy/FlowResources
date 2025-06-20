"use server";

import { connectDB } from "@/lib/mongoConnection";
import { Website as WebsiteModel } from "@/models/schemas/website.model";
import { ActionResponse } from "@/models/types/actions";
import { Website } from "@/models/types/website";
import msgs from '@/models/resources/messages';

const fetchDeleteWebsite = async (websiteId: string): Promise<ActionResponse<Website>> => {
  try {
    await connectDB();
    const result = await WebsiteModel.deleteOne({ _id: websiteId });
    if (result.deletedCount === 0) {
      console.error(msgs.website.deleteError);
      return { status: 'error', error: msgs.website.deleteError };
    }
    return { status: 'success' };
  } catch (error) {
    console.error(`${msgs.website.deleteError}:`, error);
    return { status: 'error', error: msgs.website.deleteError };
  }
};

export default fetchDeleteWebsite;
