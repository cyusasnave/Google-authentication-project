import express from 'express';
import userController from '../controllers/user.controller';

const UserRouter = express.Router();

UserRouter.post("/register", userController.addUser);

export default UserRouter;