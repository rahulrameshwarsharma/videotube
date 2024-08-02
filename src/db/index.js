import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


// we use semicolon for avoiding error as a professional coder

;const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB Connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection failed error", error);
        process.exit(1)
    }
}

export default connectDB;

