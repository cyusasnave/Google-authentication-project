"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.verifyAccessToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const constants_1 = require("./constants");
const generateAccessToken = (userData) => {
    const token = jsonwebtoken_1.default.sign(userData, constants_1.JWT_KEY, {
        expiresIn: "1d",
    });
    return token;
};
exports.generateAccessToken = generateAccessToken;
const verifyAccessToken = (token, res) => {
    if (!token || token == null) {
        return res.status(401).json({
            status: "Unauthorized",
            message: "Please login to continue!",
        });
    }
    return jsonwebtoken_1.default.verify(String(token), constants_1.JWT_KEY);
};
exports.verifyAccessToken = verifyAccessToken;
function validateToken(token, secretKey) {
    try {
        if (!token) {
            return {
                valid: false,
                reason: "Unauthorized, Please login to continue!",
            };
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, secretKey);
        if (decodedToken)
            return { valid: true };
        return { valid: true };
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
            return {
                valid: false,
                reason: "Unauthorized, Please login to continue!",
            };
        }
        else {
            return {
                valid: false,
                reason: "Unexpected error, Please login to continue!",
            };
        }
    }
}
exports.validateToken = validateToken;
