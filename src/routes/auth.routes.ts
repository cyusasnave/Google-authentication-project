import express from "express";
import passport = require("passport");
import authController from "../controllers/auth.controller";
const authRouter = express.Router();

authRouter
  .get(
    "/",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  )
  .get(
    "/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    authController.handleGoogleAuth
  );

export default authRouter;
