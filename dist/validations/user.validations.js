"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const userValidation = joi_1.default.object({
    image: joi_1.default.any().required().messages({
        "any.required": "User image is required!",
        "binary.base": "Invalid image format",
    }),
    firstName: joi_1.default.string()
        .required()
        .min(2)
        .regex(/^[A-Za-z\s]+$/)
        .messages({
        "string.empty": "Name field can't be empty!",
        "string.min": "Name must be a least 2 character long!",
        "string.pattern.base": "Name can't include numbers and special characters!",
    }),
    lastName: joi_1.default.string()
        .required()
        .min(2)
        .regex(/^[A-Za-z\s]+$/)
        .messages({
        "string.empty": "Name field can't be empty!",
        "string.min": "Name must be a least 2 character long!",
        "string.pattern.base": "Name can't include numbers and special characters!",
    }),
    // email: Joi.string().required().email().messages({
    //     "string.empty": "Email field can't be empty!",
    //     "string.email": "Invalid email"
    // }),
    role: joi_1.default.string()
        .optional()
        .valid("User")
        .error(new Error('User role should be "User" by default')),
    isVerified: joi_1.default.boolean()
        .optional()
        .valid(false)
        .error(new Error("IsVerified should be false by default")),
});
const validateUser = (data) => {
    return userValidation.validate(data);
};
exports.default = validateUser;
