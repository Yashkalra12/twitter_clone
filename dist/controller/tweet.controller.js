"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Function to create a tweet
function createTweet(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, content } = req.body;
        const userid = req.user.id; // Assuming user object has an id property
        try {
            const result = yield prisma.tweet.create({
                data: {
                    title,
                    content,
                    userid
                }
            });
            res.send({ result });
        }
        catch (error) {
            console.error("Error creating tweet:", error);
            res.status(500).send({ error: "Error creating tweet" });
        }
    });
}
// Function to get all tweets
function getAllTweets(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let alltweet = yield prisma.tweet.findMany({
                include: {
                    user: true
                }
            });
            res.send({ tweets: alltweet });
        }
        catch (error) {
            console.error("Error getting tweets:", error);
            res.status(500).send({ error: "Error getting tweets" });
        }
    });
}
// Function to get a specific tweet by id (implementation missing)
function getTweetById(req, res) {
    // Implement logic to retrieve tweet by id
    res.status(500).send({ error: "Not implemented yet" });
}
// Function to delete a tweet by id
function deleteTweet(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            yield prisma.tweet.delete({
                where: {
                    id: parseInt(id)
                }
            });
            res.send({ message: "Tweet deleted successfully" });
        }
        catch (error) {
            console.error("Error deleting tweet:", error);
            res.status(500).send({ error: "Error deleting tweet" });
        }
    });
}
// Function to update a tweet by id
function updateTweet(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const { title, content } = req.body;
        try {
            const updatedTweet = yield prisma.tweet.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    title,
                    content
                }
            });
            res.send({ updatedTweet });
        }
        catch (error) {
            console.error("Error updating tweet:", error);
            res.status(500).send({ error: "Error updating tweet" });
        }
    });
}
exports.default = {
    createTweet,
    getAllTweets,
    getTweetById,
    deleteTweet,
    updateTweet
};
