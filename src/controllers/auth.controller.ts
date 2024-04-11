import { Request, Response } from "express";
import { GoogleUserModel } from "../database/models/user.model";
import { GoogleUserModelAttributes } from "../database/models/user.model";
import { generateAccessToken } from "../helpers/security.helpers";
import uploadSingle from "../middlewares/upload";
import { senderEmail } from "../helpers/nodemailer";
import {
  CREATED,
  EmailMessage,
  FORBIDDEN,
  HttpResponse,
  INTERNAL_SERVER_ERROR,
  SUCCESS,
} from "../responses";

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

        if (isVerified == false) {
          return res
            .status(403)
            .json(
              HttpResponse(FORBIDDEN, "Please verify your email to continue!")
            );
        }

        const { id, googleId, email, role } = userData;
        const token = generateAccessToken({ id, googleId, email, role });

        return res.status(200).json({
          ...HttpResponse(SUCCESS, "LoggedIn to your account successfully!"),
          token: token,
        });
      } else {
        // CREATE
        const newUser = await GoogleUserModel.create({ ...userProfile });
        await newUser.save();

        const { firstName, googleId, email, lastName } = newUser.dataValues;

        senderEmail({
          to: email,
          subject: "Account Created",
          html: `
          <div style="padding:20px">
            <p>Hello ${firstName} ${lastName}, Thank you for joining our platform! Please confirm this email.</p>
            <a href="http://${req.headers.host}/users/auth/google/verifyEmail?googleId=${googleId}" style="background-color:MediumSeaGreen;color:white;padding:6px 20px;border:none;border-radius:5px;text-decoration:none" target="_blank">Confirm</a>
          </div>`,
        });

        res
          .status(201)
          .json(
            HttpResponse(
              CREATED,
              "Account created successfully! Please verify your email!"
            )
          );
      }
    }
  } catch (error) {
    res
      .status(500)
      .json(HttpResponse(INTERNAL_SERVER_ERROR, "Something went wrong!"));
  }
};

const verifyEmail = async (req: Request, res: Response) => {
  try {
    const googleId = req.query.googleId as unknown as string;
    const UserExist = await GoogleUserModel.findOne({
      where: { googleId },
    });
    const userData = UserExist?.dataValues;
    const UserIsVerified = userData?.isVerified;

    if (!UserIsVerified) {
      await GoogleUserModel.update(
        { isVerified: true },
        {
          where: { googleId },
        }
      );

      res
        .status(200)
        .json(HttpResponse(SUCCESS, "Account verified successfully!"));
    } else {
      return res
        .status(403)
        .json(HttpResponse(FORBIDDEN, "Account already verified!"));
    }
  } catch (error) {
    res
      .status(500)
      .json(HttpResponse(INTERNAL_SERVER_ERROR, "Something went wrong!"));
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

  const user = await GoogleUserModel.findByPk(userId);
  const returnUser = user?.dataValues;

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

      await GoogleUserModel.update(updateUser, {
        where: {
          id: userId,
        },
      });
      const updatedUser = await GoogleUserModel.findOne({
        where: {
          id: userId,
        },
      });

      const returnUpdatedUser = updatedUser?.dataValues;

      let changedImage = false;
      let changedFirstName = false;
      let changedLastName = false;

      if (returnUser?.image != returnUpdatedUser?.image) {
        changedImage = true;
      }
      if (returnUser?.firstName != returnUpdatedUser?.firstName) {
        changedFirstName = true;
      }
      if (returnUser?.lastName != returnUpdatedUser?.lastName) {
        changedLastName = true;
      }

      senderEmail({
        to: returnUser?.email as string,
        subject: "Account Updated",
        html: EmailMessage({
          changedImage,
          changedFirstName,
          changedLastName,
          returnUser,
          returnUpdatedUser,
        }),
      });

      return res.status(200).json({
        ...HttpResponse(SUCCESS, "User profile updated successfully!"),
        result: updatedUser,
      });
    } else {
      const updateUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      };

      await GoogleUserModel.update(updateUser, {
        where: {
          id: userId,
        },
      });
      const updatedUser = await GoogleUserModel.findOne({
        where: {
          id: userId,
        },
      });

      const returnUpdatedUser = updatedUser?.dataValues;

      let changedFirstName = false;
      let changedLastName = false;

      if (returnUser?.firstName != returnUpdatedUser?.firstName) {
        changedFirstName = true;
      }
      if (returnUser?.lastName != returnUpdatedUser?.lastName) {
        changedLastName = true;
      }

      if (changedFirstName !== false || changedLastName !== false) {
        senderEmail({
          to: returnUser?.email as string,
          subject: "Account Updated",
          html: EmailMessage({
            changedFirstName,
            changedLastName,
            returnUser,
            returnUpdatedUser,
          }),
        });
      }

      return res.status(200).json({
        ...HttpResponse(SUCCESS, "User profile updated successfully!"),
        result: updatedUser,
      });
    }
  } catch (error) {
    res.status(500).json({
      ...HttpResponse(INTERNAL_SERVER_ERROR, "Something went wrong!"),
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
  
export default {
  handleGoogleAuth,
  verifyEmail,
  updateUser,
  userDashboard,
  userLogout,
  getAllUsers, 
  getUserById 
};
