//password= 267KnrH0FysJKJmS
//"mongodb+srv://admin:267KnrH0FysJKJmS@cluster0.taukt.mongodb.net/"

import express from "express";
import mongoose from "mongoose";
import userRoute from "./route/UserRoute.js";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import leaveRouter from "./route/LeaveRoute.js";
import salaryRouter from "./route/SalaryRoute.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(
    cors({
      origin: "http://localhost:5173", // Allow frontend URL
      credentials: true, // Allow cookies, authorization headers
      methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
      allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    })
  );
  
app.use(bodyParser.json());


app.use((req,res,next)=>{

    const publicRoutes = [
        "/api/employees/login",
        "/api/employees/request-otp",
        "/api/employees/verify-otp",
        "/api/employees/reset-password"
    ];
    
    if (publicRoutes.includes(req.originalUrl)) {
        console.log(`Bypassing auth for: ${req.originalUrl}`);
        return next();
    }

    let token = req.header("Authorization")

    if(token){
        token = token.replace("Bearer ", "")
        jwt.verify(token,process.env.jwt,(error, decoded)=>{
            if(error){
                res.status(401).json({
                    error : "Invalid token"
                    
                })
                return;
            }
            req.user=decoded;
            next();
            
        })
    }
    else{
        res.status(401).json({
            error : "Authorization token required"
        })
        return;
    }
})

let mongoUrl = process.env.MONGO_URL;


mongoose.connect(mongoUrl);

const conn = mongoose.connection;

conn.once("open",()=>{
    console.log("Connection established")
})

app.use("/api/employees",userRoute);
app.use("/api/leave",leaveRouter);
app.use("/api/salary",salaryRouter);


app.listen(5000,()=>{
    console.log ("Server running on port 5000");
})