import Leave from "../models/LeaveModel.js";
import { isAdmin , isEmployee } from "./UserControllers.js";

export function requestLeave(req, res) {

    if (!req.user) {
        res.status(401).json({ 
            message: "Please log in and try again" 
        });
        return;
    }
    else if(req.user.role == "User"){
        res.status(401).json({ 
            message: "You are not authorized to do it" 
        });
        return;
    }

    const data = req.body;
    data.email = req.user.email;
    data.name = req.user.firstName + " " + req.user.lastName;
    
    const newLeave = new Leave(data);
    newLeave.save().then(() =>{
        res.json({ 
            message: "Leave request submitted successfully" 
        }) 
       
    }).catch(() => {
        res.status(500).json({
            message: "Failed to submit leave request" 
        });

    }) 
}

export function getLeaveRequests(req, res) {
    if (!req.user) {
         res.status(401).json({ 
            message: "Please log in and try again" 
        })
        return;
    }

    else if(isAdmin(req)){
       
        Leave.find().then((leaves)=>{
            res.json(leaves);
        }).catch(()=>{
            res.json({
                message : "Leaves not found"
            })
        })
    }

    else if(isEmployee(req)){
        
        const email = req.user.email;
        Leave.find({email : email }).then((leaveDetail)=>{
            res.json(leaveDetail);
         }).catch(()=>{
            res.json({
                message : "Leave not found"
            })
         })


    }
}

export function deleteLeaveRequest(req, res) {
    if (!req.user) {

        res.status(401).json({ 
            message: "Please log in and try again"
        });
        return ;
    }
   
    else if(isAdmin (req)){
            const id = req.params.id;
   
            Leave.deleteOne({id : id }).then(()=>{
               res.json({
                   message : "Leave deleted successfully"
               })
            }).catch(()=>{
               res.status(500).json({
                   message : "Failed to delete leave request" 
               })
            })
    }
    else {
        res.json({
            message : " You can not delete leave"
        })
        return;
    }
}

export function approveLeaveRequest(req, res) {

    if (!req.user || req.user.role !== "Admin") {

        res.status(403).json({ 
            message: "You are not authorized to approve leave requests" 
        })
        return;
    }
    const leaveId = req.params.id;

    Leave.findOneAndUpdate({id : leaveId}, { status: "Approved" }).then(() => 
        res.json({
             message: "Leave request approved successfully" 
            })

        ).catch(() => 
            res.status(500).json({ 
                message: "Failed to approve leave request" 
            })
        );
}

export function rejectLeaveRequest(req, res) {

    if (!req.user || req.user.role !== "Admin") {

        res.status(403).json({ 
            message: "You are not authorized to reject leave requests" 
        })
        return;
    }

    const leaveId = req.params.id;

    Leave.findOneAndUpdate({id : leaveId}, { status: "Rejected" }).then(() => 
        res.json({ 
            message: "Leave request rejected successfully" 
        })
     ).catch(() => 
        res.status(500).json({ 
            message: "Failed to reject leave request" 
        })
    );
}

export function updateLeaveRequest(req,res){
    if (!req.user) {
        res.status(401).json({ 
           message: "Please log in and try again" 
       })
       return;
   }

    else if(isEmployee(req)){

        const leaveId = req.params.id;
        const data = req.body;
        

        const foundLeave = Leave.findOne({id : leaveId})

        if (foundLeave == null){
            res.json({
                message : "Leave not found"
            })
        }
        else{
            if(Leave.email = req.user.email){
                Leave.updateOne({id : leaveId},{$set: { reason: data.reason, startDate: data.startDate, endDate: data.endDate}}).then(()=>{
                    //console.log(res);
                    res.json({
                        message : "Your leaving details are updated"
                    })
        
                }).catch((er)=>{
                    console.log(er)
                    res.json({
                        message : "Leave update is failed"
                    })
                })
            }
            
        }
    }
    else{
        res.json({
            message : "You are not authorized to do it"
        })
    }
}