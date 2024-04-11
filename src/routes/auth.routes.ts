import express from "express";
import passport from "../middlewares/passport";
import authController from "../controllers/auth.controller";
import authCheck from "../middlewares/authCheck";
import fileUpload from "../middlewares/multer";
import validations from "../middlewares/validations";
import authentication from "../middlewares/authentication";

const authRouter = express.Router();

// REGISTER (WITH GOOGLE)
authRouter.get(
  "/",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
// GOOGLE CALLBACK ROUTE
authRouter.get(
  "/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  authController.handleGoogleAuth
);
// LOGIN (WITH GOOGLE)
authRouter.get(
  "/login",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
// VERIFY EMAIL ROUTE
authRouter.get("/verifyEmail", authController.verifyEmail);
// PROTECTED DASHBOARD
authRouter.get("/dashboard", authCheck, authController.userDashboard);
// LOGOUT
authRouter.get("/logout", authController.userLogout);

// GET ALL USERS
authRouter.get("/users", authentication.isAdmin, authController.getAllUsers);
// GET SINGLE USER
authRouter.get(
  "/users/:id",
  authentication.isAdmin,
  authController.getUserById
);
// UPDATE
authRouter.patch(
  "/users/:id",
  authentication.isAdmin,
  fileUpload.single("image"),
  validations.isValidUser,
  authController.updateUser
);
// DELETE
authRouter.delete(
  "/users/:id",
  authentication.isAdmin,
  authController.deleteUser
);

export default authRouter;
