import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes.js';
import { connection } from './config/connectionMiddleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
connection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', userRouter);

app.listen(PORT, () => {
    console.log(`Server connected on port: ${PORT}`);
})