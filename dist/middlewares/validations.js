"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_validations_1 = __importDefault(require("../validations/user.validations"));
const responses_1 = require("../responses");
const isValidUser = (req, res, next) => {
    let image;
    if (req.body.email) {
        return res
            .status(400)
            .json((0, responses_1.HttpResponse)(responses_1.BAD_REQUEST, "User email can't be changed!"));
    }
    if (req.file) {
        image = req.file.path;
    }
    const body = Object.assign({ image: image }, req.body);
    const { error } = (0, user_validations_1.default)(body);
    if (error) {
        return res
            .status(400)
            .json((0, responses_1.HttpResponse)(responses_1.BAD_REQUEST, error.details[0].message.replace(/\"/g, "")));
    }
    try {
        next();
    }
    catch (error) {
        console.error(error);
    }
};
exports.default = { isValidUser };
