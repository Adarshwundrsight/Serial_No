import { OTP } from "../models/otp.js";

export const generateotp = async (req, res) => {
    function generateUnique() {
        const character = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let uniquecode = "";

        for (let i = 0; i < 9; i++) {
            const randomIndex = Math.floor(Math.random() * character.length);
            uniquecode += character.charAt(randomIndex);
        }
        return uniquecode;
    }

    try {
        const code =generateUnique()
        while(1)
        {
            
            const otp = await OTP.findOne({code});

            if (!otp) {
                const op=await OTP.create({code})
                console.log("got otp",code);
                return res.json({ code: code});
            }
            else
            {
                code=generateUnique()
                // return res.status(409).json({
                //     message: "Generated code already exists in the database.",
                //     success: false,
                // });
            
            }
        }

        // Handle the case when the generated code already exists in the database
        // For example, generate a new code or return an error response.
       
    } catch (error) {
        res.status(401).json({
            message: "Something went wrong",
            success: false,
            user: req.user,
        });
        console.log(error);
    }
};

export const matchOTP=async(req,res)=>{
    try{
        const {code}=req.body;

        const otpmatch= await OTP.findOne({code});
        console.log(otpmatch)
        if(otpmatch){
            return res.status(201).json({
                success:true,
                message:"OPT Match",
            });
        }
        else
        {
            res.status(401).json({
                message:"wrong OTP",
                success:false,
                user:req.user,
            })
        }
    }
    catch(error){
        res.status(401).json({
            message:"wrong OTP",
            success:false,
            user:req.user,
        })
        console.log(error)
    }
}

export const getAll=async(req,res)=>{
    try {
        const otp =await OTP.find({});
    
      
    
        return res.status(201).json({
            success:true,
            otp
        });
       } catch (error) {
        res.status(401).json({
            message:"wrong OTP",
            success:false,
            user:req.user,
        })
        console.log(error)
       }
}
