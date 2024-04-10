"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const uuid_1 = require("uuid");
const constants_1 = require("../helpers/constants");
const GoogleStrategy = passport_google_oauth20_1.default.Strategy;
const userProfile = (profile) => {
    const { id, name, emails, photos } = profile;
    const user = {
        id: (0, uuid_1.v4)(),
        googleId: id,
        image: photos[0].value,
        firstName: name.givenName,
        lastName: name.familyName,
        email: emails[0].value,
        isVerified: false,
        role: "User",
    };
    return user;
};
passport_1.default.serializeUser((id, done) => {
    done(null, id);
});
passport_1.default.deserializeUser((id, done) => {
    done(null, id);
});
passport_1.default.use(new GoogleStrategy({
    clientID: constants_1.GOOGLE_CLIENT_ID,
    clientSecret: constants_1.GOOGLE_SECRET_ID,
    callbackURL: constants_1.GOOGLE_CALLBACK_URL,
    passReqToCallback: true,
}, (_req, _accessToken, _refreshToken, profile, cb) => {
    cb(null, userProfile(profile));
}));
exports.default = passport_1.default;
