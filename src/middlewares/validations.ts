import { NextFunction, Request, Response } from "express";
import validateUser from "../validations/user.validations";

const isValidUser = (req: Request, res: Response, next: NextFunction) => {
  let image;

  if (req.file) {
    image = req.file.path;
  }

  const body = {
    image: image,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };
  const { error } = validateUser(body);

  if (error) {
    return res.status(400).json({
      status: "Bad Request",
      message: error.details[0].message,
    });
  }
  try {
    next();
  } catch (error) {
    console.error(error);
  }
};

export default { isValidUser };
