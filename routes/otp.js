import express from "express"
import {generateotp,matchOTP,getAll} from "../controller/otp.js"

const router=express.Router();

router.post('/new',generateotp);
router.post('/match',matchOTP);
router.get('/all',getAll)

export default router;