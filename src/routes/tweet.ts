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

router.get("/",verifyToken,async (req,res)=>{
    let alltweet=await prisma.tweet.findMany({
       include:{
           user:true  
       }
    });
    res.send({tweets:alltweet});
})
router.get("/:id",(req,res)=>{
   
})

router.delete("/:id", verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.tweet.delete({
            where: {
                id: parseInt(id)
            }
        });
        res.send({ message: "Tweet deleted successfully" });
    } catch (error) {
        console.error("Error deleting tweet:", error);
        res.status(500).send({ error: "Error deleting tweet" });
    }
});

router.put("/:id", verifyToken, async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const updatedTweet = await prisma.tweet.update({
            where: {
                id: parseInt(id)
            },
            data: {
                title,
                content
            }
        });
        res.send({ updatedTweet });
    } catch (error) {
        console.error("Error updating tweet:", error);
        res.status(500).send({ error: "Error updating tweet" });
    }
});

export default router