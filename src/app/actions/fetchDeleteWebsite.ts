import { connectDB } from "@/lib/mongoConnection";
import { Website as WebsiteModal } from "@/models/schemas/website.model";
import { DeleteResult } from "mongoose";

const fetchDeleteWebsite = async (websiteId: string) => {
  try {
    await connectDB();
    const res: DeleteResult = await WebsiteModal.deleteOne({ _id: websiteId });
    if (res.deletedCount === 0) {
      console.error('Error deleting website:', res);
      return res;
    }
    return null;
  } catch (error) {
    console.error('Error deleting website:', error);
    return error;
  }
};

export default fetchDeleteWebsite;
