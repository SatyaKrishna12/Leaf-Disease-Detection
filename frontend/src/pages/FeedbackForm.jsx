import React, { useState } from 'react';
import axios from 'axios';
import '../assets/scss/styles.scss';
import Header from '../components/Header';
import { jwtDecode } from 'jwt-decode';

function FeedbackForm() {
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
   const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const user_id = decoded.id;

      const response = await axios.post(
        'http://localhost:3001/feedback', 
        { feedback:content, user_id },
      );

      setMessage(response.data.message || 'Feedback sent!');
      setContent('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <Header />
      <section className="feedback">
        <div className="login__box">
          <h2 className="section__title">Give Us Your Feedback</h2>

          <form onSubmit={handleSubmit} className="login__form">
            <div className="login__input-group">
              <label>Feedback</label>
              <textarea
                name="content"
                rows="5"
                cols="30"
                placeholder="Write your feedback here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                style={{ resize: 'none' }}
              />
            </div>

            <button type="submit" className="button button--flex login__btn">
              Submit
            </button>

            {message && <p style={{ marginTop: '10px' }}>{message}</p>}
          </form>
        </div>
      </section>
    </>
  );
}

export default FeedbackForm;
