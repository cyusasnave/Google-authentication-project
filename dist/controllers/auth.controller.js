"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../database/models/user.model");
const security_helpers_1 = require("../helpers/security.helpers");
const handleGoogleAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.user) {
            const userProfile = req.user;
            const isUserExist = yield user_model_1.GoogleUserModel.findOne({
                where: { googleId: userProfile.googleId },
            });
            if (isUserExist) {
                return res
                    .status(409)
                    .json({ status: "confict", message: "User already exist!!" });
            }
            const newUser = yield user_model_1.GoogleUserModel.create(Object.assign({}, userProfile));
            yield newUser.save();
            const { id, googleId, email, role } = newUser.dataValues;
            const token = (0, security_helpers_1.generateAccessToken)({ id, googleId, email, role });
            res.status(201).json({ message: "created", token: token });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error });
    }
});
exports.default = { handleGoogleAuth };
