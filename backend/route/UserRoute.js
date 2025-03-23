import express from "express";
<<<<<<< HEAD
import { createEmployee,deleteEmployee,getEmployee,loginEmployee } from "../controllers/UserControllers.js";
=======
import { createEmployee,deleteEmployee,getEmployee,loginEmployee, resetPassword,requestOtp,verifyOtp } from "../controllers/UserControllers.js";
>>>>>>> 1e80ea31 (jobCard)
import { updateEmployee } from "../controllers/UserControllers.js";

const userRoute = express.Router();

userRoute.post("/",createEmployee);
userRoute.put("/:id",updateEmployee);
userRoute.post("/login",loginEmployee);
userRoute.delete("/:id",deleteEmployee);
userRoute.get("/",getEmployee);
<<<<<<< HEAD
=======
userRoute.post("/request-otp", requestOtp);
userRoute.post("/verify-otp", verifyOtp);
userRoute.post("/reset-password", resetPassword);
>>>>>>> 1e80ea31 (jobCard)

export default userRoute;