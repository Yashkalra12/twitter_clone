"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyToken = require("../utils/auth").verifyToken;
const { createTweet, getAllTweets, getTweetById, deleteTweet, updateTweet } = require("./tweet.controller");
const router = express_1.default.Router();
router.post("/", verifyToken, createTweet);
router.get("/", verifyToken, getAllTweets);
router.get("/:id", verifyToken, getTweetById); // Update route handler
router.delete("/:id", verifyToken, deleteTweet);
router.put("/:id", verifyToken, updateTweet);
exports.default = router;
