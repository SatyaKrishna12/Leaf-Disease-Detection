import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import mongoose from "mongoose";
import Disease_details from "../models/DiseaseDetection.js";
import AllPredictions from "../models/allpredictions.js";
export const handlePrediction = async (req, res) => {
  try {
    const imagePath = req.file.path;
    const userId = req.body.user_id; 
    // Step 1: Send image to Flask server
    const formData = new FormData();
    formData.append("file", fs.createReadStream(imagePath));

    const response = await axios.post("http://127.0.0.1:3001/predict", formData, {
      headers: formData.getHeaders(),
    });

    const { predicted_class, confidence_score } = response.data;

    // Step 2: Delete uploaded file
    fs.unlinkSync(imagePath);
    // Find disease details in MongoDB
    // console.log(predicted_class)
      const diseaseDetails=await Disease_details.findOne({Disease_Name:predicted_class});
    if(!diseaseDetails){
      return res.status(404).json({message:"Disease not found"});
    }
    
    const enterAllPredictions=await AllPredictions.create({
      user_id:userId,
      disease_name:predicted_class,
      confidence_score:confidence_score,
      url:imagePath
    });
    console.log(enterAllPredictions)
    // Step 3: Send result to React frontend
    res.json({
      success: true,
      predicted_class,
      confidence_score,
      diseaseDetails: {
        name: diseaseDetails.Disease_Name,
        description: diseaseDetails.Description,
        causes: diseaseDetails.Causes,
        solutions: diseaseDetails.Solutions,
      }
    });

  } catch (error) {
    console.error("Prediction Failed:", error.message);
    res.status(500).json({
      success: false,
      message: "Prediction failed",
      error: error.message,
    });
  }
};
