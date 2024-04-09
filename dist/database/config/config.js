"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const constants_1 = require("../../helpers/constants");
const db = new sequelize_1.Sequelize(constants_1.DB_NAME, constants_1.DB_USER, constants_1.DB_PASS, {
    host: "localhost",
    dialect: "postgres",
});
exports.default = db;
