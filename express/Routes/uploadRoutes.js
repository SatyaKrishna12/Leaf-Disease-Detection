import express from 'express';
import mongoose from 'mongoose';
import Disease_details from '../models/DiseaseDetection.js';
const router = express.Router();
import upload from '../middlewares/upload.js';

router.post('/leaf', upload.single('image'), (req, res) => {
  res.json({ url: `/uploads/${req.file.filename}` });
});



export default router;