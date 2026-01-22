import express from 'express';
import userRouter from './routes/auth.routes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();

app.use(cors());
app.use(cookieParser(`${process.env.COOKIE_SECRET}`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', userRouter);

export default app;
