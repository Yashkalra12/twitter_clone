import express from "express";
const verifyToken = require("../utils/auth").verifyToken;
const { createTweet, getAllTweets, getTweetById, deleteTweet, updateTweet } = require("./tweet.controller");

const router = express.Router();

router.post("/", verifyToken, createTweet);
router.get("/", verifyToken, getAllTweets);
router.get("/:id", verifyToken, getTweetById); // Update route handler
router.delete("/:id", verifyToken, deleteTweet);
router.put("/:id", verifyToken, updateTweet);

export default router;