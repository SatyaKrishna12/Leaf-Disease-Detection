import React from 'react';
import { useState, useEffect } from 'react';
import '../assets/scss/styles.scss';
import Header from '../components/Header';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";


function AllPredictions() {
  const token = localStorage.getItem('token'); // or however you stored it
const decoded = jwtDecode(token);
const userId = decoded.id;

  const  [predictions, setPredictions] = useState([]);
  useEffect(() => { 
    const fetchPredictions = async () => {
      try{
        const response = await axios.post("http://localhost:3001/predict/allpredictions", {
          user_id: userId,
        });
        if (response.status === 200) {
          const temp=response.data
           setPredictions(response.data);
           console.log(predictions)
        }
      }
      catch (error) {
        console.error("Error fetching predictions:", error);
      }

    }
    fetchPredictions();
  },[])
  return (
    <>
    <Header/>
    <section className="predictions section container">
      <h2 className="section__title">Your Past Predictions</h2>

      <div className="predictions__grid">
        { ( predictions.length>0) ? (
          predictions.map((item, index) => (
            <div className="prediction__card" key={index}>
              {/* <img
                src={item.url}
                className="prediction__image"
              /> */}
              <div className="prediction__content">
                <h3 className="prediction__title">{item.disease_name}</h3>
                <p className="prediction__score">
                  Confidence: <span>{(item.confidence_score * 100).toFixed(2)}%</span>
                </p>
                {/* {item.timestamp && (
                  <p className="prediction__date">
                    {new Date(item.confidence).toLocaleString()}
                  </p>
                )} */}

              </div>
            </div>
          ))
        ) : (
          <p className="no__predictions">No predictions found.</p>
        )}
      </div>
    </section>
    </>
  );
}

export default AllPredictions;
