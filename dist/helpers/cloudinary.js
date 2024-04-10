"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const constants_1 = require("./constants");
cloudinary_1.v2.config({
    cloud_name: constants_1.CLOUDINARY_CLOUD_NAME,
    api_key: constants_1.CLOUDINARY_API_KEY,
    api_secret: constants_1.CLOUDINARY_API_SECRET,
});
exports.default = cloudinary_1.v2;
