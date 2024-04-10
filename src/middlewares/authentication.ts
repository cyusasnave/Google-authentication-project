import { NextFunction, Request, Response } from "express";
import { validateToken, verifyAccessToken } from "../helpers/security.helpers";
import { JWT_KEY } from "../helpers/constants";
import { JwtPayload } from "jsonwebtoken";
import { GoogleUserModel } from "../database/models/user.model";

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  const validToken = validateToken(token, JWT_KEY);

  if (!validToken.valid)
    return res.status(401).json({
      status: "Unauthorized",
      message: validToken.reason,
    });

  try {
    const decoded = verifyAccessToken(token as string, res) as JwtPayload;
    const id = decoded.id;

    const user = await GoogleUserModel.findByPk(id);
    const defaultUser = user?.dataValues;

    if (defaultUser?.role !== "Admin")
      return res.status(403).json({
        status: "Forbidden",
        message: "Only admin can perform this action!",
      });

    next();
  } catch (error) {
    res.status(401).json({
      status: "Unauthorized",
      message: "Something wrong, Please login again to continue!",
    });
  }
};

export default {
  isAdmin,
};