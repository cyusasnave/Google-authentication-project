"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetch = exports.Created = void 0;
exports.Created = {
    status: "Created",
    message: "Account created! Please verify your email!",
};
const fetch = (value) => {
    return {
        status: "OK",
        message: `${value} fetched successfully!`,
    };
};
exports.fetch = fetch;
