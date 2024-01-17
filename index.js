import express from "express"
import {config} from "dotenv"
import {connectDB} from "./data/database.js"
import cors from "cors"; 
import otprout from "./routes/otp.js"



const app=express();

config({
    path:"./config.env"
});

connectDB()
app.use(express.json());

app.use(
    cors({
      origin: [process.env.FRONTEND_URL],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );

app.use("/wundrsight/v1/otp",otprout);

app.get("/",(req,res)=>{
    res.send("hello dear");
})
const port=process.env.PORT;

app.listen(port,()=>{
    console.log(`app is running ${port} `)
});