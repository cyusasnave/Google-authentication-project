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
const responses_1 = require("../responses");
const authCheck = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userProfileFromRequest = req.user;
    if (!userProfileFromRequest) {
        return res
            .status(401)
            .json((0, responses_1.HttpResponse)(responses_1.UNAUTHORIZED, "Please logIn to continue!"));
    }
    const UserExist = yield user_model_1.GoogleUserModel.findOne({
        where: { googleId: userProfileFromRequest.googleId },
    });
    const userData = UserExist === null || UserExist === void 0 ? void 0 : UserExist.dataValues;
    const isVerified = userData === null || userData === void 0 ? void 0 : userData.isVerified;
    if (isVerified == false) {
        return res
            .status(403)
            .json((0, responses_1.HttpResponse)(responses_1.FORBIDDEN, "Please verify your email to continue!"));
    }
    next();
});
exports.default = authCheck;
