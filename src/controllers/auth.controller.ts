import { Request, Response } from "express";
import { GoogleUserModel } from "../database/models/user.model";
import { GoogleUserModelAttributes } from "../database/models/user.model";
import { generateAccessToken } from "../helpers/security.helpers";

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

export default {
  handleGoogleAuth,
  userDashboard,
  userLogout,
};
