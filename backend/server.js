import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";  // Import CORS
import userRoute from "./route/UserRoute.js";
import leaveRouter from "./route/LeaveRoute.js";
import sparePartRoutes from "./route/productRoute.js";

dotenv.config();
const app = express();

// 🔹 Middleware
app.use(bodyParser.json());
app.use(cors());  // Enable CORS

// 🔹 Static Folder for Images
app.use("/uploads", express.static("uploads"));

// 🔹 MongoDB Connection
let mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const conn = mongoose.connection;
conn.once("open", () => {
    console.log("Connection established");
});

// 🔹 Routes
app.use("/api/employees", userRoute);
app.use("/api/leave", leaveRouter);
app.use("/api/spareparts", sparePartRoutes);

// 🔹 Start Server
app.listen(5000, () => {
    console.log("Server running on port 5000");
}

);
