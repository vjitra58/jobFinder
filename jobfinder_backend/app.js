import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import ErrorMiddleware from "./middlewares/Error.js";


const app =  express();
dotenv.config({path: "./config/config.env"});
//use middle wares;
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//use routes
import User from "./routes/userRoutes.js";

app.use("/api/v1/user", User);

export default app;

app.use(ErrorMiddleware);
