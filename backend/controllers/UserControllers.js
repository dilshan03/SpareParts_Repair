import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();

export function createEmployee(req,res){

    const data = req.body;

    data.password = bcrypt.hashSync(data.password,10);

    const newUser = new User(data);

    newUser.save().then(()=>{
        res.json({
            message : "Employee created successfuly"
        })
    }).catch((error)=> {
        res.status(500).json({
            error : "Employee Not created"
        })
    })
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

export function updateEmployee(req,res){

    if(isAdmin(req)){
 

        const id = req.params.id;
        const data = req.body;
        
        User.updateOne({id : id },data).then(()=>{
            res.json({
                message : "Employee updates successfully"
            })
        }).catch(()=>{
            res.status(500).json({
                message : "Employee update is failed"
            })
        })


    }

    else if(isEmployee(req)){


        const id = req.params.id;
        const data = req.body;
        const email = req.user.email;

        const foundUser = User.findOne({id : id})

        if(foundUser == null){
            res.json({
                message : "Employee not found"
            })
            return;
        }
        else {
            if(User.email = email){
                User.updateOne({id : id },{status : data.status}).then(()=>{
                    res.json({
                          message : "Updated successfull"
                    })
                }).catch(()=>{
                    res.status(500).json({
                        message : "Update failed"
                    })
                })
              
            }
        }
    }
    else {
        res.status(403).json({
            message : "You are not authorized to do it"
        })
        return;
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
                    email : user.email
                },process.env.jwt)

                res.json({
                    message : "Login Sucessfull" ,
                    token : token,
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