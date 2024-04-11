import passport from "passport";
import GooglePassport from "passport-google-oauth20";
import { GoogleUserModelAttributes } from "../database/models/user.model";
import { v4 as UUIDV4 } from "uuid";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_SECRET_ID,
  GOOGLE_CALLBACK_URL,
} from "../helpers/constants";

const GoogleStrategy = GooglePassport.Strategy;

const userProfile = (profile: any) => {

  const { id, name, emails, photos } = profile;

  const user: GoogleUserModelAttributes = {
    id: UUIDV4(),
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

passport.serializeUser((id: any, done) => {
  done(null, id);
});

passport.deserializeUser((id: any, done) => {
  done(null, id);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID!,
      clientSecret: GOOGLE_SECRET_ID!,
      callbackURL: GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    (
      _req: any,
      _accessToken: any,
      _refreshToken: any,
      profile: any,
      cb: any
    ) => {
      cb(null, userProfile(profile));
    }
  )
);

export default passport;
