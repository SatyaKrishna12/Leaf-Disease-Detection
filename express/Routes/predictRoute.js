import express from "express";
import upload from "../middlewares/upload.js";
import { handlePrediction } from "../controllers/predictController.js";
import totalPredictions from "../models/allpredictions.js";
const router = express.Router();

router.post("/", upload.single("image"), handlePrediction);
router.post("/allpredictions",async(req,res)=>{
    const userId = req.body.user_id; 
    const allPredictions=await totalPredictions.find({user_id:userId});
    if(!allPredictions){
        return res.status(404).json({message:"No predictions found"});
    }
    console.log(allPredictions)
    res.json(allPredictions)
});
export default router;
