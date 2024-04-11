interface emailParms {
  changedImage?: boolean;
  changedFirstName: boolean;
  changedLastName: boolean;
  returnUser: any;
  returnUpdatedUser: any;
}
export const HttpResponse = (status: string, message: string) => {
  return {
    status: status,
    message: message,
  };
};

export const CREATED = "Created";
export const SUCCESS = "Success";
export const CONFLICT = "Conflict";
export const NOT_FOUND = "Not Found";
export const BAD_REQUEST = "Bad Request";
export const UNAUTHORIZED = "Unauthorized";
export const INTERNAL_SERVER_ERROR = "Internal Server Error";
export const FORBIDDEN = "Forbidden";

export const EmailMessage = ({
  changedImage,
  changedFirstName,
  changedLastName,
  returnUser,
  returnUpdatedUser,
}: emailParms) => {
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
        ${
          changedFirstName
            ? `<li><strong>First Name:</strong> ${returnUpdatedUser.firstName}</li>`
            : ""
        }
        ${
          changedLastName
            ? `</li><li><strong>Last Name:</strong> ${returnUpdatedUser.lastName}</li>`
            : ""
        }
        ${
          changedImage
            ? `<li><strong>Image</strong>(<a href="${returnUpdatedUser.image}" style="text-decoration:none;color:mediumseagreen" target="_blank">View image</a>)</li>`
            : ""
        }  
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
