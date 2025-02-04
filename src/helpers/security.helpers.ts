import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { JWT_KEY } from "./constants";
import { Response } from "express";
import { HttpResponse, UNAUTHORIZED } from "../responses";

interface DecodedToken {
  expiresIn?: number;
  [secretKey: string]: any;
}

interface Result {
  valid: boolean;
  reason?: string;
}

// GENERATE TOKEN FUNCTION
export const generateAccessToken = (userData: any) => {
  const token = jwt.sign(userData, JWT_KEY, {
    expiresIn: "1d",
  });

  return token;
};

// VERIFY TOKEN FUNCTION
export const verifyAccessToken = (token: string, res: Response) => {
  if (!token || token == null) {
    return res
      .status(401)
      .json(HttpResponse(UNAUTHORIZED, "Please login to continue!"));
  }
  return jwt.verify(String(token), JWT_KEY);
};

// VALIDATE TOKEN FUNCTION
export function validateToken(
  token: string | undefined,
  secretKey: string
): Result {
  try {
    if (!token) {
      return {
        valid: false,
        reason: "Unauthorized, Please login to continue!",
      };
    }

    const decodedToken = jwt.verify(token, secretKey) as DecodedToken;

    if (decodedToken) return { valid: true };

    return { valid: true };
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      return {
        valid: false,
        reason: "Unauthorized, Please login to continue!",
      };
    } else {
      return {
        valid: false,
        reason: "Unexpected error, Please login to continue!",
      };
    }
  }
}
