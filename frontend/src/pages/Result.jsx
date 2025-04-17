// src/components/Result.jsx
import React from 'react';
import '../assets/scss/styles.scss';



function Result({ image, prediction, score, description, cause, solution }) {
  return (
    <section className="result section container">
      <div className="result__container grid">
        {/* Image */}
        <div className="result__image-wrapper">
          <img src={image} alt="Predicted Leaf" className="result__image" />
        </div>

        {/* Prediction Title */}
        <div className="result__info">
          <h2 className="result__title">
            Disease Detected: <span className="result__highlight">{prediction}</span>
          </h2>
          <p className="result__score">
            Confidence Score: <span className="result__highlight">{(score * 100).toFixed(2)}%</span>
          </p>

          {/* Description, Cause, Solution */}
          <div className="result__details">
            <div className="result__section">
              <h3 className="result__section-title">Description</h3>
              <p className="result__text">{description}</p>
            </div>

            <div className="result__section">
              <h3 className="result__section-title">Cause</h3>
              <p className="result__text">{cause}</p>
            </div>

            <div className="result__section">
              <h3 className="result__section-title">Solution</h3>
              <p className="result__text">{solution}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Result;
