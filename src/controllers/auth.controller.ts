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

const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    let image;
    let uploadedImage;

    if (req.file) {
      image = req.file;
      const uploadImage = await uploadSingle(image.path);

      if ("error" in uploadImage) {
        return res.status(500).json({
          message: "Error uploading image",
          error: uploadImage.error,
        });
      }
      uploadedImage = uploadImage?.secure_url;

      const updateUser = {
        image: uploadedImage,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      };

      const result = await GoogleUserModel.update(updateUser, {
        where: {
          id: userId,
        },
      });
      const updatedUser = await GoogleUserModel.findOne({
        where: {
          id: userId,
        },
      });

      return res.status(200).json({
        result: updatedUser,
        message: "user updated successfully",
        status: 200,
      });
    } else {
      const updateUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      };

      const result = await GoogleUserModel.update(updateUser, {
        where: {
          id: userId,
        },
      });
      const updatedUser = await GoogleUserModel.findOne({
        where: {
          id: userId,
        },
      });
      return res.status(200).json({
        result: updatedUser,
        message: "user updated successfully",
        status: 200,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error,
    });
  }
};

export default { handleGoogleAuth, updateUser };
