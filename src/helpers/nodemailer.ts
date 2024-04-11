import nodemailer from "nodemailer";
import {
  ADMINISTRATOR_EMAIL,
  ADMINISTRATOR_NAME,
  NODEMAILER_PASSWORD,
} from "./constants";

interface MailOptions {
  to: string;
  subject: string;
  html: any;
}

const sender = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: ADMINISTRATOR_EMAIL,
    pass: NODEMAILER_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export function senderEmail({ to, subject, html }: MailOptions) {
  const mailOptions = {
    from: `"${ADMINISTRATOR_NAME}" <${ADMINISTRATOR_EMAIL}>`,
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
