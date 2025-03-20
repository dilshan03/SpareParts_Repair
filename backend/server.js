//password= 267KnrH0FysJKJmS
//"mongodb+srv://admin:267KnrH0FysJKJmS@cluster0.taukt.mongodb.net/"

import express from "express";
import mongoose from "mongoose";
import userRoute from "./route/UserRoute.js";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import leaveRouter from "./route/LeaveRoute.js";

dotenv.config();
const app = express();
app.use(bodyParser.json());


app.use((req,res,next)=>{

    if(req.path == "/api/employees/login"){
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


app.listen(5000,()=>{
    console.log ("Server running on port 5000");
})
