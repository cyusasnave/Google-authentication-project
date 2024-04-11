import express from "express";
import authRouter from "./auth.routes";

const router = express.Router();

router.use("/auth/google", authRouter);

export default router;
