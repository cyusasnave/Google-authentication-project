"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fileUpload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({}),
    fileFilter: (_req, file, callback) => {
        let ext = path_1.default.extname(file.originalname);
        if (ext !== ".png" &&
            ext !== ".jpg" &&
            ext !== ".jpeg" &&
            ext !== ".gif" &&
            ext !== ".webp" &&
            ext !== ".bmp" &&
            ext !== ".tiff" &&
            ext !== ".jfif" &&
            ext !== ".tif") {
            return callback(null, false);
        }
        callback(null, true);
    },
});
exports.default = fileUpload;
