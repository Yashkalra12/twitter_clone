import express from "express";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const router= express.Router();



router.post("/",async(req,res)=>{
    console.log(req.body);
    const {firstname ,lastname, username, email, password}= req.body;
    let user=await prisma.user.create({
        data:{
            firstname, lastname, username, email, password
        }
    })
    console.log(user);
    res.send("User added");
});



export default router;
