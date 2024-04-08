"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASSWORD;
const db = new sequelize_1.Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: "localhost",
    dialect: "postgres",
});
exports.default = db;
