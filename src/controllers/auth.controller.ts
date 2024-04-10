import { Request, Response } from "express";
import { GoogleUserModel } from "../database/models/user.model";
import { GoogleUserModelAttributes } from "../database/models/user.model";
import { generateAccessToken } from "../helpers/security.helpers";
import uploadSingle from "../middlewares/upload";

const handleGoogleAuth = async (req: Request, res: Response) => {
  try {
    if (req.user) {
      const userProfile = req.user as GoogleUserModelAttributes;

      const UserExist = await GoogleUserModel.findOne({
        where: { googleId: userProfile.googleId },
      });
      // LOGIN
      if (UserExist) {
        const userData = UserExist.dataValues;
        const isVerified = userData.isVerified;

        if (!isVerified) {
          return res
            .status(403)
            .json({ message: "please verfiy you're email" });
        }

        const { id, googleId, email, role } = userData;
        const token = generateAccessToken({ id, googleId, email, role });

        return res.status(201).json({ message: "created", token: token });
      } else {
        // CREATE
        const newUser = await GoogleUserModel.create({ ...userProfile });
        await newUser.save();

        res.status(201).json({ message: "created" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error });
  }
};
const userDashboard = async (req: Request, res: Response) => {
  const userProfile = req.user as GoogleUserModelAttributes;
  res
    .status(200)
    .send(
      `<h1>Welcome to Dashboard ${userProfile.firstName} ${userProfile.lastName} 🎉</h1> <br> <a href="/users/auth/google/logout">Logout</a>`
    );
};

const userLogout = async (req: Request, res: Response, done: any) => {
  req.logout(done);
  res.redirect("/");
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

export default {
  handleGoogleAuth,
  updateUser,
  userDashboard,
  userLogout,
};
