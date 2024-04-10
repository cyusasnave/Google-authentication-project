"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport = require("passport");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const authRouter = express_1.default.Router();
authRouter
    .get("/", passport.authenticate("google", {
    scope: ["profile", "email"],
}))
    .get("/callback", passport.authenticate("google", { failureRedirect: "/" }), auth_controller_1.default.handleGoogleAuth);
exports.default = authRouter;
