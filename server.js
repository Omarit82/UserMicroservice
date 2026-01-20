import app from "./src/app.js";
import { connection } from "./src/config/connectionMiddleware.js";
import dotenv from "dotenv";

dotenv.config();
connection();

app.listen(process.env.PORT, () => {
    console.log(`Server connected on port: ${process.env.PORT}`);
})