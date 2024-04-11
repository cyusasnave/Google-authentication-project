import express from "express";
import passport from "../middlewares/passport";
import authController from "../controllers/auth.controller";
import authCheck from "../middlewares/authCheck";
import fileUpload from "../middlewares/multer";
import validations from "../middlewares/validations";
import authentication from "../middlewares/authentication";

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
authRouter.get("/verifyEmail", authController.verifyEmail);
authRouter.get("/dashboard", authCheck, authController.userDashboard);
authRouter.get("/logout", authController.userLogout);
authRouter.get(
  "/login",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
authRouter.get("/users", authentication.isAdmin, authController.getAllUsers);
authRouter.get(
  "/users/:id",
  authentication.isAdmin,
  authController.getUserById
);
authRouter.delete(
  "/users/:id",
  authentication.isAdmin,
  authController.deleteUser
);
authRouter.patch(
  "/:id",
  authentication.isAdmin,
  fileUpload.single("image"),
  validations.isValidUser,
  authController.updateUser
);

export default authRouter;
