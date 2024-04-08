import { Request, Response } from "express";
import { UserModel } from "../database/models/user.model";
import { Created } from "../responses/index";

const addUser = async (request: Request, response: Response) => {
  try {
    const user = await UserModel.create({ ...request.body });
    response.status(201).json({
        ...Created, user: user
    });
  } catch (error) {
    response.status(500).json({ msg: "Internal Server Error", err: error });
  }
};

export default {
  addUser,
};
