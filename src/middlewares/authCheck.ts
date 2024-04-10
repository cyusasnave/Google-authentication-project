import { Request, Response, NextFunction } from "express";
import { GoogleUserModelAttributes } from "../database/models/user.model";

const authCheck = (req: Request, res: Response, next: NextFunction) => {
  const userProfileFromRequest = req.user as GoogleUserModelAttributes;

  if (!userProfileFromRequest) {
    return res
      .status(401)
      .json({ status: "401", message: "please login to continue." });
  }
  next();
};

export default authCheck;
