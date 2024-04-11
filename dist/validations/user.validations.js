"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const userValidation = joi_1.default.object({
    image: joi_1.default.any().messages({
        "binary.base": "Invalid image format",
    }),
    firstName: joi_1.default.string()
        .min(2)
        .regex(/^[A-Za-z\s]+$/)
        .messages({
        "string.empty": "First name field can't be empty!",
        "string.min": "First name must be a least 2 character long!",
        "string.pattern.base": "First name can't include numbers and special characters!",
    }),
    lastName: joi_1.default.string()
        .min(2)
        .regex(/^[A-Za-z\s]+$/)
        .messages({
        "string.empty": "Last name field can't be empty!",
        "string.min": "Last name must be a least 2 character long!",
        "string.pattern.base": "Last name can't include numbers and special characters!",
    }),
}).options({ allowUnknown: false });
const validateUser = (data) => {
    return userValidation.validate(data);
};
exports.default = validateUser;
