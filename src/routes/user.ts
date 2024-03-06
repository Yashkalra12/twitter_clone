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


router.get("/:id",async(req,res)=>{
    const id = req.params.id;
    let user=await prisma.user.findUnique({
        where:{
            id:Number(id)
        }
    })
    res.send({user});
})


router.get("/:username",async(req,res)=>{
    const username = req.params.username;
    let users=await prisma.user.findMany({
        where:{
            OR:[
               {
                firstname:{
                    contains:username
                },
                lastname:{
                    contains:username
                }
               }
            ]
        }
       
    })
    console.log({users});
})



router.delete("/:id",verifyToken,async(req,res)=>{
    const id = req.params.id;
    if(id!=req.user.id) return res.send("not a valid request");
   let result= await prisma.user.delete({
          where:{
           id:Number(id)
          }
   })
   res.send("user deleted");
})


router.put("/:id",verifyToken,(req,res)=>{

})




export default router;
