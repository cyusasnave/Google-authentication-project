import express from "express";
import passport = require("passport");
import authController from "../controllers/auth.controller";
import fileUpload from "../middlewares/multer";
import Validation from "../middlewares/validations";
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
authRouter.patch(
  "/:id",
  fileUpload.single("image"),
  Validation.isValidUser,
  authController.updateUser
);

authRouter.get("/users", authController.getAllUsers);
authRouter.get("/users/:id", authController.getUserById);

export default authRouter;
