import express from "express";
import passport = require("passport");
import authController from "../controllers/auth.controller";
import authCheck from "../middlewares/authCheck";

const authRouter = express.Router();

authRouter.get(
  "/",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
authRouter.get(
  "/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  authController.handleGoogleAuth
);
authRouter.get("/dashboard", authCheck, authController.userDashboard);
authRouter.get("/logout", authController.userLogout);
authRouter.get(
  "/login",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
authRouter.patch('/:id',fileUpload.single('image'),Validation.isValidUser,authController.updateUser)

export default authRouter;
