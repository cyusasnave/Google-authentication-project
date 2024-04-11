import express, { Application } from "express";
import session from "express-session";
import passport from "./middlewares/passport";
import router from "./routes";
import { SESSION_SECRET } from "./helpers/constants";

const app: Application = express();

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use("/", router);
app.get("/", (req, res) => {
  res.send(`<h1>Welcome To Google Authentication Propject</h1>
  <br>
  <a href="/users/auth/google/">Create Account With Google</a>
  <br>
  <span>Or</span>
  <br>
  <a href="/users/auth/google/login">Login With Google</a>
  `);
});

export default app;
