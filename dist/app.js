"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("./middlewares/passport"));
const routes_1 = __importDefault(require("./routes"));
const constants_1 = require("./helpers/constants");
const app = (0, express_1.default)();
app.use((0, express_session_1.default)({
    secret: constants_1.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(express_1.default.json());
app.use("/api", routes_1.default);
app.get("/", (_req, res) => {
    res.send(`
    <h1>Welcome To Google Authentication Project</h1>
    <br>
    <a href="/api/auth/google/">Create Account With Google</a>
    <br>
    <span>Or</span>
    <br>
    <a href="/api/auth/google/login">Login With Google</a>
  `);
});
exports.default = app;
