import express from "express";
import { createEmployee,deleteEmployee,getEmployee,loginEmployee, updateEmpPassword } from "../controllers/UserControllers.js";
import { updateEmployee } from "../controllers/UserControllers.js";

const userRoute = express.Router();

userRoute.post("/",createEmployee);
userRoute.put("/:id",updateEmployee);
userRoute.post("/login",loginEmployee);
userRoute.delete("/:id",deleteEmployee);
userRoute.get("/",getEmployee);
userRoute.put("/resetpassword/:id",updateEmpPassword);

export default userRoute;