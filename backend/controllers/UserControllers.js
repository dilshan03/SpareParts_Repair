import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASWD,
    }
});

export async function createEmployee(req, res) {
    try {

        const data = req.body;
        const plainPassword = req.body.password;
        data.password = bcrypt.hashSync(data.password, 10);

        const newUser = new User(data);

        await newUser.save(); // Save the user asynchronously

        const mailOptions = {
            from: process.env.EMAIL,
            to: data.email,
            subject: "Welcome to COSMOExports!",
            html: `
                <h2>Welcome ${data.firstName} ${data.lastName}!</h2>
                <p>We are excited to have you on board.</p>
                <p>Your login details:</p>
                <ul>
                    <li><strong>ID:</strong> ${data.id}</li>
                    <li><strong>Email:</strong> ${data.email}</li>
                    <li><strong>Password:</strong> ${plainPassword}</li>
                </ul>
                <p>Please log in to the system and change your password for security reasons</p>
                <p>Best Regards,<br>COSMOExports</p>
            `
        };

        try {
            await transporter.sendMail(mailOptions); // Send email asynchronously
            return res.status(200).json({
                message: "Employee created successfully and email sent"
            });
        } catch (emailError) {
            console.error("Email Error:", emailError);
            return res.status(500).json({
                message: "Employee created, but email sending failed"
            });
        }

    } catch (error) {
        console.error("Database Error:", error);
        return res.status(500).json({
            message: "Employee not created"
        });
    }
}


export function getEmployee(req,res){

    if(isAdmin(req)){
        User.find().then((users)=>{
            res.json(users);
        }).catch(()=>{
            res.json({
                message : "Users not found"
            })
        })
    }

    else if(isEmployee(req)){
        
        const email = req.user.email;
         User.findOne({email : email }).then((userDetail)=>{
            res.json(userDetail);
         }).catch(()=>{
            res.json({
                message : "User not found"
            })
         })


    }
}

export async function updateEmployee(req,res){

    if(isAdmin(req)){
 

        const id = req.params.id;
        const data = req.body;
        try{
            await User.updateOne({id : id },data)
                res.json({
                    message : "Employee updates successfully"
                })
            
        }
        
        catch(error){
            res.status(500).json({
                message : "Employee update is failed"
            })
        

        }
            


    }

    else if(isEmployee(req)){


        const id = req.params.id;
        const data = req.body;
        const email = req.user.email;

        try{
            const foundUser = await User.findOne({id : id})

            if(foundUser == null){
                res.json({
                    message : "Employee not found"
                })
                return;
            }
            else if(foundUser.email == email){
                await User.updateOne({id : id },{status : data.status})
                    res.json({
                          message : "Updated successfull"
                    })

            }
            else{
                res.status(403).json({
                    message : "You are not authorized to do it"
                })
            }
                
        }
        catch(error){
            res.status(500).json({
                message : "Update failed"
            })
        }

    }    
    
    else {
        res.status(403).json({
            message : "You are not authorized to do it"
        })
        return;
    }


}

export async function updateEmpPassword(req,res){
    try{
        if(isEmployee(req)){

            const id = req.params.id;
            const data = req.body;

            data.password = bcrypt.hashSync(data.password, 10);

            const foundId = await User.findOne({id : id});

            if(!foundId){
                res.json({
                    message : "Employee not found"
                })
                return;
            }
            else if(foundId.email == req.user.email){

                await User.updateOne({id : foundId.id}, {password : data.password});
                res.json({
                message : "Password has been updated"

                })
            }
            else{

                res.json({
                    message : "Access denied"
                })

            }

            
        }
        else{
            res.status(403).json({
                message : "You can not perform this action"
            })
            return;
        }


    }catch{
        res.status(500).json({
            message : "Password not updated"
        })

    }
    
   

    

}

export function deleteEmployee(req,res){

    if(isAdmin (req)){
         const id = req.params.id;

        User.deleteOne({id : id }).then(()=>{
            res.json({
                message : "Employee deleted successfully"
            })
         }).catch(()=>{
            res.status(500).json({
                message : "Employee delete is failed"
            })
         })
    }
}

export function loginEmployee(req,res){

    const data = req.body;

    User.findOne({
        email : data.email
    }).then((user)=>{
        if(user==null){
            res.status(404).json ({
                error : "Employee not found"
            })
        }
        else{
            const isPasswordCorrect = bcrypt.compareSync(data.password,user.password);

            if(isPasswordCorrect){
                const token = jwt.sign({
                    firstName : user.firstName,
                    lastName : user.lastName,
                    role : user.role,
                    employeeType : user.employeeType,
                    salary : user.salary,
                    email : user.email,
                    profilepicture : user.profilepicture,
                },process.env.jwt)

                res.json({
                    message : "Login Sucessfull" ,
                    token : token,
                    user : user
                })

            }
            else{
                res.status(401).json({
                    error : "Login Failed"
                })
            }

        }
    })
}

export function isAdmin(req){

    let Admin = false;

    if(req.user !== null && req.user.role == "Admin"){
        Admin = true;
    }
    return Admin;

}

export function isEmployee(req){

    let employee = false;

    if(req.user !== null && req.user.role !== "Admin" && req.user.role !== "User"){

        employee = true;
    }
    return employee;
}