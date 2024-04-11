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
          .json({ status: "conflict", message: "User already exist!!" });
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

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await GoogleUserModel.findAll();

    res.status(200).json({ message: "All users", users: users });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error });
  }
};

const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try {
    const user = await GoogleUserModel.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User fetched successfuly", user: user });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error });
  }
};

export default { handleGoogleAuth, updateUser, getAllUsers, getUserById };
