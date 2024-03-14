import express from "express";
import userRoute from "./routes/user";
import loginRoute from "./routes/login";
import cookieParser from "cookie-parser";
import TweetRoute  from "./routes/tweet";
import likeRoute from "./routes/like";
import retweetRoute from "./routes/retweet";

const app=express();
const PORT=5430;


app.use(express.json());

app.get("/",(req,res)=>{
    res.send("<h1>Twitter Clone</h1>")
})

//routes
app.use("/user", userRoute);
app.use("/login",loginRoute);
app.use("/tweet",TweetRoute);
app.use("/like",likeRoute);
app.use("/retweet",retweetRoute);
app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})
