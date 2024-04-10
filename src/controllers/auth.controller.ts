import { Request, Response, response } from "express";
import { GoogleUserModel } from "../database/models/user.model";
import { GoogleUserModelAttributes } from "../database/models/user.model";
import { generateAccessToken } from "../helpers/security.helpers";
import uploadSingle from "../middlewares/upload";

const handleGoogleAuth = async (req: Request, res: Response) => {
  try {
    if (req.user) {
      const userProfile = req.user as GoogleUserModelAttributes;

      const isUserExist = await GoogleUserModel.findOne({
        where: { googleId: userProfile.googleId },
      });

      if (isUserExist) {
        return res
          .status(409)
          .json({ status: "confict", message: "User already exist!!" });
      }

      const newUser = await GoogleUserModel.create({ ...userProfile });
      await newUser.save();

      const { id, googleId, email, role } = newUser.dataValues;

      const token = generateAccessToken({ id, googleId, email, role });
      res.status(201).json({ message: "created", token: token });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error });
  }
};

// const updateUser = async (req:Request, res:Response) => {
//   try {

//     // getting the image
//     let image;
//     let uploadedImage;
//     if (req.file) {
//       image = req.file
//       const uploadImage = await uploadSingle(image.path);

//       if ("error" in uploadImage) {
//         console.log(uploadImage);
//         return res.status(500).json({
//           message: "Error uploading image",
//           error: uploadImage.error,
//         });
//       }

//       uploadedImage = uploadImage?.secure_url;
//     }

//     // then put the uploadedImage secure url in the updated image profile
//   } catch (error) {

//   }
// }

export default { handleGoogleAuth };
