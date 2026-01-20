import { Router } from 'express';
import { getUser } from '../controller/user.controller.js';

const userRouter = Router();

userRouter.get('/user/:id', getUser);

export default userRouter;