//password= 267KnrH0FysJKJmS
//"mongodb+srv://admin:267KnrH0FysJKJmS@cluster0.taukt.mongodb.net/"

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";//RY 
import userRoute from "./route/UserRoute.js";//RY
import RepairRequestFromRoute from "./routes/RepairRequestFromRoute.js";//RY
import JobCardRoute from "./routes/JobCardRoutes.js";//RY
import RepairRoute from "./routes/RepairRoutes.js"; // Import Repair Route


dotenv.config();
const app = express();

// app.use(bodyParser.json());RY


// Enable CORS for specific origin
app.use(
    cors({
      origin: "http://localhost:5173", // Allow requests from your React frontend
      methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
      allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
      credentials: true, // Allow credentials (if needed)
    })
  );
  
// Handle preflight requests
app.options("*", cors());

// Increase payload size limit
app.use(bodyParser.json({ limit: "100mb" }));  // Increase JSON limit to 50MB
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));  // Increase form-data limit

app.use((req,res,next)=>{
    //############################//RY
     // Allow public access to login and repair request routes
     if (
        req.path === "/api/employees/login" ||
        req.path.startsWith("/repairRequest") ||
        req.path.startsWith("/repairs") || // Allow access to repair routes
        req.path.startsWith("/jobcards") // Allow access to job card routes
        
    ) {
        return next();
    }
    //##########################

    // if(req.path == "/api/employees/login"){
    //     return next();
    // }RY

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

//mongoDB connection
let mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl);

const conn = mongoose.connection;
conn.once("open",()=>{
    console.log("Connection established")
})

//use router
app.use("/api/employees",userRoute); 
app.use("/repairRequest",RepairRequestFromRoute);//RY
app.use("/repairs", RepairRoute); // Repair routes RY
app.use("/jobcards", JobCardRoute); // Job card routes RY

//start server
app.listen(5000,()=>{
    console.log ("Server running on port 5000");
})
