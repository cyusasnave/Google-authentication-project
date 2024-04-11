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
const security_helpers_1 = require("../helpers/security.helpers");
const constants_1 = require("../helpers/constants");
const user_model_1 = require("../database/models/user.model");
const responses_1 = require("../responses");
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    const validToken = (0, security_helpers_1.validateToken)(token, constants_1.JWT_KEY);
    if (!validToken.valid)
        return res
            .status(401)
            .json((0, responses_1.HttpResponse)(responses_1.UNAUTHORIZED, validToken.reason));
    try {
        const decoded = (0, security_helpers_1.verifyAccessToken)(token, res);
        const id = decoded.id;
        const user = yield user_model_1.GoogleUserModel.findByPk(id);
        if (!user) {
            return res
                .status(401)
                .json((0, responses_1.HttpResponse)(responses_1.UNAUTHORIZED, "Please login to continue!"));
        }
        const defaultUser = user === null || user === void 0 ? void 0 : user.dataValues;
        if ((defaultUser === null || defaultUser === void 0 ? void 0 : defaultUser.role) !== "Admin")
            return res
                .status(403)
                .json((0, responses_1.HttpResponse)(responses_1.FORBIDDEN, "Only admin can perform this action!"));
        next();
    }
    catch (error) {
        res
            .status(401)
            .json((0, responses_1.HttpResponse)(responses_1.UNAUTHORIZED, "Something wrong, Please login again to continue!"));
    }
});
exports.default = {
    isAdmin,
};
