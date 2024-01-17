import mongoose from "mongoose";

const schema=new mongoose.Schema({
    code: { 
        type: String, 
        require:true
        
      },
})
export const OTP=mongoose.model("otp",schema)