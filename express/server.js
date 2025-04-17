import express from "express";
import path from "path";
import dotenv from "dotenv";
import connectDB from "./config/dbconfig.js";
import userRoutes from "./Routes/userRoutes.js";
import predictRoute from "./Routes/predictRoute.js";
import uploadRoutes from "./Routes/uploadRoutes.js";
import cors from "cors";
import feedbackRoute from "./Routes/feedbackRoute.js";



dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
app.use(cors());

connectDB();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

// Routes
app.get("/", (req, res) => {
  res.send("hi");
});
app.use("/users", userRoutes);
app.use("/predict", predictRoute);
app.use("/upload", uploadRoutes);
app.use("/feedback", feedbackRoute);

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
