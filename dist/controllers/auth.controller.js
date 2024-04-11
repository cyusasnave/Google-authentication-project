"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../database/models/user.model");
const security_helpers_1 = require("../helpers/security.helpers");
const upload_1 = __importDefault(require("../middlewares/upload"));
const nodemailer_1 = require("../helpers/nodemailer");
const responses_1 = require("../responses");
// REGISTER AND LOGIN
const handleGoogleAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.user) {
            const userProfile = req.user;
            const UserExist = yield user_model_1.GoogleUserModel.findOne({
                where: { googleId: userProfile.googleId },
            });
            // LOGIN
            if (UserExist) {
                const userData = UserExist.dataValues;
                const isVerified = userData.isVerified;
                if (isVerified == false) {
                    return res
                        .status(403)
                        .json((0, responses_1.HttpResponse)(responses_1.FORBIDDEN, "Please verify your email to continue!"));
                }
                const { id, googleId, email, role } = userData;
                const token = (0, security_helpers_1.generateAccessToken)({ id, googleId, email, role });
                return res.status(200).json(Object.assign(Object.assign({}, (0, responses_1.HttpResponse)(responses_1.SUCCESS, "LoggedIn to your account successfully!")), { token: token }));
            }
            else {
                // CREATE
                const newUser = yield user_model_1.GoogleUserModel.create(Object.assign({}, userProfile));
                yield newUser.save();
                const { firstName, googleId, email, lastName } = newUser.dataValues;
                (0, nodemailer_1.senderEmail)({
                    to: email,
                    subject: "Account Created",
                    html: `
          <div style="padding:20px">
            <p>
              Hello ${firstName} ${lastName}, <br /><br />
              Thank you for creating an account with us! 🎉 To complete the process,
              <br />please click the link below to confirm and finish setting up your
              account:
            </p>
            <br />
            <a
              href="http://${req.headers.host}/api/auth/google/verifyEmail?googleId=${googleId}"
              style="
                background-color: MediumSeaGreen;
                color: white;
                padding: 6px 20px;
                border: none;
                border-radius: 5px;
                text-decoration: none;
              "
              target="_blank"
              >
                Confirm
              </a
            >
            <br />
            <br />
            <p>
              If you have any questions or need assistance, feel free to reply to this
              email. <br />We’re here to help! 🙌 <br />
              <br />
              Best regards!!
            </p>
          </div>`,
                });
                res
                    .status(201)
                    .json((0, responses_1.HttpResponse)(responses_1.CREATED, "Account created successfully! Please verify your email!"));
            }
        }
    }
    catch (error) {
        res
            .status(500)
            .json((0, responses_1.HttpResponse)(responses_1.INTERNAL_SERVER_ERROR, "Something went wrong!"));
    }
});
// EMAIL VERIFICATION HANDLING
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const googleId = req.query.googleId;
        const UserExist = yield user_model_1.GoogleUserModel.findOne({
            where: { googleId },
        });
        const userData = UserExist === null || UserExist === void 0 ? void 0 : UserExist.dataValues;
        const UserIsVerified = userData === null || userData === void 0 ? void 0 : userData.isVerified;
        if (!UserIsVerified) {
            yield user_model_1.GoogleUserModel.update({ isVerified: true }, {
                where: { googleId },
            });
            res
                .status(200)
                .json((0, responses_1.HttpResponse)(responses_1.SUCCESS, "Account verified successfully!"));
        }
        else {
            return res
                .status(403)
                .json((0, responses_1.HttpResponse)(responses_1.FORBIDDEN, "Account already verified!"));
        }
    }
    catch (error) {
        res
            .status(500)
            .json((0, responses_1.HttpResponse)(responses_1.INTERNAL_SERVER_ERROR, "Something went wrong!"));
    }
});
// USER DASHBOARD
const userDashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userProfile = req.user;
    res.status(200).send(`
        <h1>Welcome to Dashboard ${userProfile.firstName} ${userProfile.lastName} 🎉</h1> 
        <br> 
        <a href="/api/auth/google/logout">
          Logout
        </a>
      `);
});
// LOGOUT LOGIC
const userLogout = (req, res, done) => __awaiter(void 0, void 0, void 0, function* () {
    req.logout(done);
    res.redirect("/");
});
// GET ALL USERS LOGIC
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.GoogleUserModel.findAll();
        res.status(200).json(Object.assign(Object.assign({}, (0, responses_1.HttpResponse)(responses_1.SUCCESS, "Users fetched successfully!")), { users: users }));
    }
    catch (error) {
        res.status(500).json(Object.assign(Object.assign({}, (0, responses_1.HttpResponse)(responses_1.INTERNAL_SERVER_ERROR, "Something went wrong!")), { error: error }));
    }
});
// GET USER BY ID LOGIC
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    if (!userId) {
        return res
            .status(400)
            .json((0, responses_1.HttpResponse)(responses_1.BAD_REQUEST, "User id not specified!"));
    }
    try {
        const user = yield user_model_1.GoogleUserModel.findOne({
            where: {
                id: userId,
            },
        });
        if (!user) {
            return res.status(404).json((0, responses_1.HttpResponse)(responses_1.NOT_FOUND, "User not found!"));
        }
        res.status(200).json(Object.assign(Object.assign({}, (0, responses_1.HttpResponse)(responses_1.SUCCESS, "User fetched successfully!")), { user: user }));
    }
    catch (error) {
        res.status(500).json(Object.assign(Object.assign({}, (0, responses_1.HttpResponse)(responses_1.INTERNAL_SERVER_ERROR, "Something went wrong!")), { error: error }));
    }
});
// UPDATE USER BY ID LOGIC
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const user = yield user_model_1.GoogleUserModel.findByPk(userId);
    const returnUser = user === null || user === void 0 ? void 0 : user.dataValues;
    try {
        let image;
        let uploadedImage;
        if (req.file) {
            image = req.file;
            const uploadImage = yield (0, upload_1.default)(image.path);
            if ("error" in uploadImage) {
                return res.status(500).json({
                    message: "Error uploading image",
                    error: uploadImage.error,
                });
            }
            uploadedImage = uploadImage === null || uploadImage === void 0 ? void 0 : uploadImage.secure_url;
            const updateUser = {
                image: uploadedImage,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
            };
            yield user_model_1.GoogleUserModel.update(updateUser, {
                where: {
                    id: userId,
                },
            });
            const updatedUser = yield user_model_1.GoogleUserModel.findOne({
                where: {
                    id: userId,
                },
            });
            const returnUpdatedUser = updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.dataValues;
            let changedImage = false;
            let changedFirstName = false;
            let changedLastName = false;
            if ((returnUser === null || returnUser === void 0 ? void 0 : returnUser.image) != (returnUpdatedUser === null || returnUpdatedUser === void 0 ? void 0 : returnUpdatedUser.image)) {
                changedImage = true;
            }
            if ((returnUser === null || returnUser === void 0 ? void 0 : returnUser.firstName) != (returnUpdatedUser === null || returnUpdatedUser === void 0 ? void 0 : returnUpdatedUser.firstName)) {
                changedFirstName = true;
            }
            if ((returnUser === null || returnUser === void 0 ? void 0 : returnUser.lastName) != (returnUpdatedUser === null || returnUpdatedUser === void 0 ? void 0 : returnUpdatedUser.lastName)) {
                changedLastName = true;
            }
            (0, nodemailer_1.senderEmail)({
                to: returnUser === null || returnUser === void 0 ? void 0 : returnUser.email,
                subject: "Account Updated",
                html: (0, responses_1.EmailMessage)({
                    changedImage,
                    changedFirstName,
                    changedLastName,
                    returnUser,
                    returnUpdatedUser,
                }),
            });
            return res.status(200).json(Object.assign(Object.assign({}, (0, responses_1.HttpResponse)(responses_1.SUCCESS, "User profile updated successfully!")), { result: updatedUser }));
        }
        else {
            const updateUser = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
            };
            yield user_model_1.GoogleUserModel.update(updateUser, {
                where: {
                    id: userId,
                },
            });
            const updatedUser = yield user_model_1.GoogleUserModel.findOne({
                where: {
                    id: userId,
                },
            });
            const returnUpdatedUser = updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.dataValues;
            let changedFirstName = false;
            let changedLastName = false;
            if ((returnUser === null || returnUser === void 0 ? void 0 : returnUser.firstName) != (returnUpdatedUser === null || returnUpdatedUser === void 0 ? void 0 : returnUpdatedUser.firstName)) {
                changedFirstName = true;
            }
            if ((returnUser === null || returnUser === void 0 ? void 0 : returnUser.lastName) != (returnUpdatedUser === null || returnUpdatedUser === void 0 ? void 0 : returnUpdatedUser.lastName)) {
                changedLastName = true;
            }
            if (changedFirstName !== false || changedLastName !== false) {
                (0, nodemailer_1.senderEmail)({
                    to: returnUser === null || returnUser === void 0 ? void 0 : returnUser.email,
                    subject: "Account Updated",
                    html: (0, responses_1.EmailMessage)({
                        changedFirstName,
                        changedLastName,
                        returnUser,
                        returnUpdatedUser,
                    }),
                });
            }
            return res.status(200).json(Object.assign(Object.assign({}, (0, responses_1.HttpResponse)(responses_1.SUCCESS, "User profile updated successfully!")), { result: updatedUser }));
        }
    }
    catch (error) {
        res.status(500).json(Object.assign(Object.assign({}, (0, responses_1.HttpResponse)(responses_1.INTERNAL_SERVER_ERROR, "Something went wrong!")), { error: error }));
    }
});
// DELETE USER BY ID LOGIC
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    if (!userId) {
        return res
            .status(400)
            .json((0, responses_1.HttpResponse)(responses_1.BAD_REQUEST, "User id not specified!"));
    }
    try {
        yield user_model_1.GoogleUserModel.destroy({ where: { id: userId } });
        res.status(200).json((0, responses_1.HttpResponse)(responses_1.SUCCESS, "User deleted successfully!"));
    }
    catch (error) {
        res.status(500).json(Object.assign(Object.assign({}, (0, responses_1.HttpResponse)(responses_1.INTERNAL_SERVER_ERROR, "Something went wrong!")), { error: error }));
    }
});
exports.default = {
    handleGoogleAuth,
    verifyEmail,
    updateUser,
    userDashboard,
    userLogout,
    getAllUsers,
    getUserById,
    deleteUser,
};
