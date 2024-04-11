"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("../middlewares/passport"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const authCheck_1 = __importDefault(require("../middlewares/authCheck"));
const multer_1 = __importDefault(require("../middlewares/multer"));
const validations_1 = __importDefault(require("../middlewares/validations"));
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const authRouter = express_1.default.Router();
// REGISTER (WITH GOOGLE)
authRouter.get("/", passport_1.default.authenticate("google", {
    scope: ["profile", "email"],
}));
// GOOGLE CALLBACK ROUTE
authRouter.get("/callback", passport_1.default.authenticate("google", { failureRedirect: "/login" }), auth_controller_1.default.handleGoogleAuth);
// LOGIN (WITH GOOGLE)
authRouter.get("/login", passport_1.default.authenticate("google", {
    scope: ["profile", "email"],
}));
// VERIFY EMAIL ROUTE
authRouter.get("/verifyEmail", auth_controller_1.default.verifyEmail);
// PROTECTED DASHBOARD
authRouter.get("/dashboard", authCheck_1.default, auth_controller_1.default.userDashboard);
// LOGOUT
authRouter.get("/logout", auth_controller_1.default.userLogout);
// GET ALL USERS
authRouter.get("/users", authentication_1.default.isAdmin, auth_controller_1.default.getAllUsers);
// GET SINGLE USER
authRouter.get("/users/:id", authentication_1.default.isAdmin, auth_controller_1.default.getUserById);
// UPDATE
authRouter.patch("/users/:id", authentication_1.default.isAdmin, multer_1.default.single("image"), validations_1.default.isValidUser, auth_controller_1.default.updateUser);
// DELETE
authRouter.delete("/users/:id", authentication_1.default.isAdmin, auth_controller_1.default.deleteUser);
exports.default = authRouter;
