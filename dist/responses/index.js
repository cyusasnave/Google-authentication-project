"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailMessage = exports.FORBIDDEN = exports.INTERNAL_SERVER_ERROR = exports.UNAUTHORIZED = exports.BAD_REQUEST = exports.NOT_FOUND = exports.CONFLICT = exports.SUCCESS = exports.CREATED = exports.HttpResponse = void 0;
// HTTP RESPONSE OBJECT
const HttpResponse = (status, message) => {
    return {
        status: status,
        message: message,
    };
};
exports.HttpResponse = HttpResponse;
// HTTP RESPONSES
exports.CREATED = "Created";
exports.SUCCESS = "Success";
exports.CONFLICT = "Conflict";
exports.NOT_FOUND = "Not Found";
exports.BAD_REQUEST = "Bad Request";
exports.UNAUTHORIZED = "Unauthorized";
exports.INTERNAL_SERVER_ERROR = "Internal Server Error";
exports.FORBIDDEN = "Forbidden";
// UPDATE EMAIL MESSAGE
const EmailMessage = ({ changedImage, changedFirstName, changedLastName, returnUser, returnUpdatedUser, }) => {
    return `
  <div style="padding:20px">
    <p>
        Dear <strong>${returnUser.firstName}</strong>, <br> <br>
        We hope this email finds you well! We wanted to inform you that your
        profile has been successfully updated.🎉
        <br>
        Here are the details of the changes made: <br>
    </p>
    <ul>
        ${changedFirstName
        ? `<li><strong>First Name:</strong> ${returnUpdatedUser.firstName}</li>`
        : ""}
        ${changedLastName
        ? `</li><li><strong>Last Name:</strong> ${returnUpdatedUser.lastName}</li>`
        : ""}
        ${changedImage
        ? `<li><strong>Image</strong>(<a href="${returnUpdatedUser.image}" style="text-decoration:none;color:mediumseagreen" target="_blank">View image</a>)</li>`
        : ""}  
    </ul>
    <p>
        If you have any questions or need further assistance, feel free to reply
        to this email or visit our support center. <br> <br>Thank you for keeping your
        profile information up-to-date! We appreciate your attention to detail.
        <br><br>Best regards
    </p>
  </div>
  `;
};
exports.EmailMessage = EmailMessage;
