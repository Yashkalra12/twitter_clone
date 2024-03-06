import express from "express";
import { PrismaClient } from '@prisma/client'
import { verifyToken } from "../utils/auth";
const prisma = new PrismaClient()
const router= express.Router();


router.post("/",verifyToken,async(req,res)=>{
    const {title,content} =req.body;
    const userid= req.user.id;
    let result=await prisma.tweet.create({
        data:{
            title,
            content,
            userid
        }
    })
    console.log(result);
    res.send({result:result});
})


export default router