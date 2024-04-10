"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("./constants");
const generateAccessToken = (userData) => {
    const token = jsonwebtoken_1.default.sign(userData, constants_1.JWT_KEY, {
        expiresIn: "1d",
    });
    return token;
};
exports.generateAccessToken = generateAccessToken;
