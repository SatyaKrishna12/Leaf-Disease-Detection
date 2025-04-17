import React from "react";
import Predictor from "../components/Predictor";
import Header from "../components/Header";

const Predict = () => {
  return (
    <>
    <Header/>
    <div className="predict-container">
      <h2>Upload Leaf Image for Prediction</h2>
      <Predictor />
    </div>
    </>
  );
};

export default Predict;
