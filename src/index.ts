import express from "express";
import userRoute from "./routes/user";
const app=express();
const PORT=5430;


app.use(express.json());

app.get("/",(req,res)=>{
    res.send("<h1>Twitter Clone</h1>")
})

//routes
app.use("/user", userRoute);
app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})