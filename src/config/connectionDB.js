import mongoose from "mongoose"


export const connection = async () => {
    try {
        const conn = await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@usermanagement.aeyiyov.mongodb.net/appData`);
        console.log("Connection established: ", conn.connection.host);
    } catch (error) {
        console.log("Error connecting to MongoDB");
        process.exit(1);
    }

}