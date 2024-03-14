import express from "express";
import { PrismaClient } from '@prisma/client'
import { verifyToken } from "../utils/auth";
const prisma = new PrismaClient()
const router= express.Router();

router.post("/:tweetid",verifyToken,async(req,res)=>{
     const {tweetid}  = req.params
     const userid= req.user.id;
     let retweeted = await prisma.retweet.findFirst({
        where:{
          tweetid: Number(tweetid),
          userid: userid
        }
     })   
     if(retweeted!=null){
       return res.send({alredyretweeted:true,data:retweeted});
     }
     let result=await prisma.retweet.create({
        data:{
            tweetid:Number(tweetid),
            userid:userid
        }
     })
     await prisma.tweet.update({
        where:{
            id:Number(tweetid)
        },
        data:{
            retweetCount:{increment:1}
        }
     })
     res.send({result});

})



router.delete("/:tweetid",verifyToken,async(req,res)=>{
    const {tweetid} = req.params
    const userid = req.user.id
   let retweet = await prisma.retweet.findFirst({
          where:{
            tweetid:Number(tweetid),
            userid:userid
          }
   })
   if(retweet!=null){
    let response=await prisma.retweet.delete({
        where:{
           id:Number(tweetid),
           userid:userid
        }
        })
         await prisma.tweet.update({
            where:{
                id: response.tweetid
            },
            data:{
                retweetCount:{decrement:1}
            }
        })
        res.send({undo:true})
    }

    res.send("retweet does not exist");
   
 

})

router.get("/",verifyToken,async (req,res)=>{
    const userid = req.user.id
   let allretweet= await prisma.retweet.findMany({
        where:{
            userid
        },
        select:{
            tweet:{
                select:{
                    title:true,
                    content:true,
                    user:{
                        select:{
                            username:true
                        }
                    }
                }
            }
        }
    })
    res.send("retweeted");
})

export default router;