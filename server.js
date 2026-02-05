import app from "./src/app.js";
import { connection } from "./src/config/connectionDB.js";
import dotenv from "dotenv";
import { initializedPassport } from "./src/middlewares/passport.middleware.js";

dotenv.config();
connection();
initializedPassport();

app.listen(process.env.PORT, () => {
    console.log(`Server connected on port: ${process.env.PORT}`);
})