import express from "express";
import { PrismaClient } from '@prisma/client'
import { verifyToken } from "../utils/auth";
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

router.get("/",async(req,res)=>{
    let users=await prisma.user.findMany();
    res.send({users});
 })


export default router;
