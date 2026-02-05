import { Router } from 'express';
import { login, loginGoogle, register } from '../controller/auth.controller.js';
import passport from 'passport';

const userRouter = Router();

userRouter.post('/login', login);
userRouter.post('/register', register);
userRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
userRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: '/session/login' }), loginGoogle)

export default userRouter;