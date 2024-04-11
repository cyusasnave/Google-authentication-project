import { NextFunction, Request, Response } from "express";
import validateUser from "../validations/user.validations";
import { BAD_REQUEST, HttpResponse } from "../responses";

const isValidUser = (req: Request, res: Response, next: NextFunction) => {
  let image;

  if (req.body.email) {
    return res
      .status(400)
      .json(HttpResponse(BAD_REQUEST, "User email can't be changed!"));
  }
  if (req.file) {
    image = req.file.path;
  }

  const body = {
    image: image,
    ...req.body,
  };
  const { error } = validateUser(body);

  if (error) {
    return res
      .status(400)
      .json(
        HttpResponse(BAD_REQUEST, error.details[0].message.replace(/\"/g, ""))
      );
  }
  try {
    next();
  } catch (error) {
    console.error(error);
  }
};

export default { isValidUser };
