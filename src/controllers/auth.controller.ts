import { Request, Response } from "express";
import { GoogleUserModel } from "../database/models/user.model";
import { GoogleUserModelAttributes } from "../database/models/user.model";
import { generateAccessToken } from "../helpers/security.helpers";
import uploadSingle from "../middlewares/upload";
import { senderEmail } from "../helpers/nodemailer";
import {
  BAD_REQUEST,
  CREATED,
  EmailMessage,
  FORBIDDEN,
  HttpResponse,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  SUCCESS,
} from "../responses";

// REGISTER AND LOGIN
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
          subject: "Account Created || Google Authentication Project",
          html: `
          <div style="padding:20px">
            <p>
              Hello ${firstName} ${lastName}, <br /><br />
              Thank you for creating an account with us! 🎉 To complete the process,
              <br />please click the link below to confirm and finish setting up your
              account:
            </p>
            <br />
            <a
              href="http://${req.headers.host}/api/auth/google/verifyEmail?googleId=${googleId}"
              style="
                background-color: MediumSeaGreen;
                color: white;
                padding: 6px 20px;
                border: none;
                border-radius: 5px;
                text-decoration: none;
              "
              target="_blank"
              >
                Confirm
              </a
            >
            <br />
            <br />
            <p>
              If you have any questions or need assistance, feel free to reply to this
              email. <br />We’re here to help! 🙌 <br />
              <br />
              Best regards!!
            </p>
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

// EMAIL VERIFICATION HANDLING
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

// USER DASHBOARD
const userDashboard = async (req: Request, res: Response) => {
  const userProfile = req.user as GoogleUserModelAttributes;
  res.status(200).send(
    `
        <h1>Welcome to Dashboard ${userProfile.firstName} ${userProfile.lastName} 🎉</h1> 
        <br> 
        <a href="/api/auth/google/logout">
          Logout
        </a>
      `
  );
};

// LOGOUT LOGIC
const userLogout = async (req: Request, res: Response, done: any) => {
  req.logout(done);
  res.redirect("/");
};

// GET ALL USERS LOGIC
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await GoogleUserModel.findAll();

    res.status(200).json({
      ...HttpResponse(SUCCESS, "Users fetched successfully!"),
      users: users,
    });
  } catch (error) {
    res.status(500).json({
      ...HttpResponse(INTERNAL_SERVER_ERROR, "Something went wrong!"),
      error: error,
    });
  }
};

// GET USER BY ID LOGIC
const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.id;
  if (!userId) {
    return res
      .status(400)
      .json(HttpResponse(BAD_REQUEST, "User id not specified!"));
  }
  const user = await GoogleUserModel.findByPk(userId);

  if (!user) {
    return res.status(404).json(HttpResponse(NOT_FOUND, "User not found!"));
  }

  try {
    const user = await GoogleUserModel.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return res.status(404).json(HttpResponse(NOT_FOUND, "User not found!"));
    }
    res.status(200).json({
      ...HttpResponse(SUCCESS, "User fetched successfully!"),
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      ...HttpResponse(INTERNAL_SERVER_ERROR, "Something went wrong!"),
      error: error,
    });
  }
};

// UPDATE USER BY ID LOGIC
const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.id;

  const user = await GoogleUserModel.findByPk(userId);

  if (!user) {
    return res.status(404).json(HttpResponse(NOT_FOUND, "User not found!"));
  }
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
        subject: "Account Updated || Google Authentication Project",
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
          subject: "Account Updated || Google Authentication Project",
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

// DELETE USER BY ID LOGIC
const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id;

  if (!userId) {
    return res
      .status(400)
      .json(HttpResponse(BAD_REQUEST, "User id not specified!"));
  }

  const user = await GoogleUserModel.findByPk(userId);

  if (!user) {
    return res.status(404).json(HttpResponse(NOT_FOUND, "User not found!"));
  }
  
  try {
    await GoogleUserModel.destroy({ where: { id: userId } });
    res.status(200).json(HttpResponse(SUCCESS, "User deleted successfully!"));
  } catch (error) {
    res.status(500).json({
      ...HttpResponse(INTERNAL_SERVER_ERROR, "Something went wrong!"),
      error: error,
    });
  }
};

export default {
  handleGoogleAuth,
  verifyEmail,
  updateUser,
  userDashboard,
  userLogout,
  getAllUsers,
  getUserById,
  deleteUser,
};
