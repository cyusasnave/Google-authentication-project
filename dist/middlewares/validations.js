"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_validations_1 = __importDefault(require("../validations/user.validations"));
const isValidUser = (req, res, next) => {
    let image;
    if (req.file) {
        image = req.file.path;
    }
    const body = {
        image: image,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    };
    const { error } = (0, user_validations_1.default)(body);
    if (error) {
        return res.status(400).json({
            status: "Bad Request",
            message: error.details[0].message,
        });
    }
    try {
        next();
    }
    catch (error) {
        console.error(error);
    }
};
exports.default = { isValidUser };
