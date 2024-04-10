import { Request, Response, NextFunction } from "express";
import {
  GoogleUserModel,
  GoogleUserModelAttributes,
} from "../database/models/user.model";
import { FORBIDDEN, HttpResponse, UNAUTHORIZED } from "../responses";

const authCheck = async (req: Request, res: Response, next: NextFunction) => {
  const userProfileFromRequest = req.user as GoogleUserModelAttributes;

  if (!userProfileFromRequest) {
    return res
      .status(401)
      .json(HttpResponse(UNAUTHORIZED, "Please logIn to continue!"));
  }

  const UserExist = await GoogleUserModel.findOne({
    where: { googleId: userProfileFromRequest.googleId },
  });

  const userData = UserExist?.dataValues;
  const isVerified = userData?.isVerified;

  if (isVerified == false) {
    return res
      .status(403)
      .json(HttpResponse(FORBIDDEN, "Please verify your email to continue!"));
  }

  next();
};

export default authCheck;
