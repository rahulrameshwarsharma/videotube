import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));

// for configuration of cookieParser
app.use(cookieParser());


// import all the routes here
import userRouter from './routes/user-routes.js';



// declare all the imported routes
app.use("/users", userRouter)

export { app }