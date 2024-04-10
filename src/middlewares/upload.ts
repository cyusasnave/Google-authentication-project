import cloudinary from "../helpers/cloudinary";
import { CLOUDINARY_FOLDER } from "../helpers/constants";

const folder = CLOUDINARY_FOLDER;

const uploadSingle = async (image: string) => {
  try {
    const result = await cloudinary.uploader.upload(image, { folder });
    return result;
  } catch (error) {
    const err = (error as Error).message;
    return { error: err }
  }
};

export default uploadSingle;