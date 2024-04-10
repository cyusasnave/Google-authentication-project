import express from "express";
import passport = require("passport");
import authController from "../controllers/auth.controller";
import authCheck from "../middlewares/authCheck";
import fileUpload from "../middlewares/multer";
import validations from "../middlewares/validations";

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
authRouter.patch('/:id',fileUpload.single('image'),validations.isValidUser,authController.updateUser)

export default authRouter;
