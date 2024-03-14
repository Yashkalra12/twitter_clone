import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

// Function to create a tweet
async function createTweet(req: Request, res: Response) {
  const { title, content } = req.body;
  const userid = req.user.id; // Assuming user object has an id property

  try {
    const result = await prisma.tweet.create({
      data: {
        title,
        content,
        userid
      }
    })
    res.send({ result });
  } catch (error) {
    console.error("Error creating tweet:", error);
    res.status(500).send({ error: "Error creating tweet" });
  }
}

// Function to get all tweets
async function getAllTweets(req: Request, res: Response) {
  try {
    let alltweet = await prisma.tweet.findMany({
      include: {
        user: true
      }
    });
    res.send({ tweets: alltweet });
  } catch (error) {
    console.error("Error getting tweets:", error);
    res.status(500).send({ error: "Error getting tweets" });
  }
}

// Function to get a specific tweet by id (implementation missing)
function getTweetById(req: Request, res: Response) {
  // Implement logic to retrieve tweet by id
  res.status(500).send({ error: "Not implemented yet" });
}

// Function to delete a tweet by id
async function deleteTweet(req: Request, res: Response) {
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
}

// Function to update a tweet by id
async function updateTweet(req: Request, res: Response) {
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
}


export default {
  createTweet,
  getAllTweets,
  getTweetById, // Implement this function
  deleteTweet,
  updateTweet
}