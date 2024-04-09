import jwt from "jsonwebtoken";
import { JWT_KEY } from "./constants";

export const generateAccessToken = (userData: any) => {
  const token = jwt.sign(userData, JWT_KEY, {
    expiresIn: "1d",
  });

  return token;
};
