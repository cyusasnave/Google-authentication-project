"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.senderEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const constants_1 = require("./constants");
const sender = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: constants_1.ADMINISTRATOR_EMAIL,
        pass: constants_1.NODEMAILER_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false,
    },
});
// SEND EMAIL FUNCTION
function senderEmail({ to, subject, html }) {
    const mailOptions = {
        from: `"${constants_1.ADMINISTRATOR_NAME}" <${constants_1.ADMINISTRATOR_EMAIL}>`,
        to,
        subject,
        html,
    };
    sender.sendMail(mailOptions, (error) => {
        if (error) {
            console.log("EMAILING USER FAILED:", error);
        }
    });
}
exports.senderEmail = senderEmail;
