import express from 'express';
import userRouter from './routes/auth.routes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';


const app = express();

app.use(session({ secret: `${process.env.SESSION_SECRET}`, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(cookieParser(`${process.env.COOKIE_SECRET}`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', userRouter);

export default app;
