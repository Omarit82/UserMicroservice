import app from "./src/app.js";
import { connection } from "./src/config/connectionDB.js";
import dotenv from "dotenv";
import { initializedPassport } from "./src/middlewares/passport.middleware.js";

const PORT = process.env.PORT || 3000
dotenv.config();
connection();
initializedPassport();

app.listen(PORT, () => {
    console.log(`Server connected on port: ${PORT}`);
})