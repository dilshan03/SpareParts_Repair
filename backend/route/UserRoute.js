import express from "express";
import { createEmployee,deleteEmployee,getEmployee,loginEmployee, resetPassword,requestOtp,verifyOtp } from "../controllers/UserControllers.js";
import { updateEmployee } from "../controllers/UserControllers.js";

const userRoute = express.Router();

userRoute.post("/",createEmployee);
userRoute.put("/:id",updateEmployee);
userRoute.post("/login",loginEmployee);
userRoute.delete("/:id",deleteEmployee);
userRoute.get("/",getEmployee);
userRoute.post("/request-otp", requestOtp);
userRoute.post("/verify-otp", verifyOtp);
userRoute.post("/reset-password", resetPassword);

export default userRoute;