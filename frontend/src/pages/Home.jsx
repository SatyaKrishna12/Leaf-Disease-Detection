import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/scss/styles.scss';
import homeImg from '../assets/img/home.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/Header';

function Home() {
  const navigate = useNavigate();

  const handlePredictClick = () => {
    navigate('/predict');
  };

  return (
    <>
    <Header/>
    <section className="home" id="home">
      <div className="home__container container grid">
        <img src={homeImg} alt="Home" className="home__img" />

        <div className="home__data">
          <h1 className="home__title">
            Plants will make <br /> your life better
          </h1>
          <p className="home__description">
            Create incredible plant design for your offices or apartments.
            Add freshness to your new ideas.
          </p>

          <div className="home__buttons">
            <a href="#about" className="button button--flex">
              Explore <FontAwesomeIcon icon={faArrowRight} size="lg" color="#FFFF" />
            </a>

            <button
              className="button button--flex"
              style={{ marginLeft: '1rem' }}
              onClick={handlePredictClick}
            >
              Predict <FontAwesomeIcon icon={faArrowRight} size="lg" color="#FFFF" />
            </button>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

export default Home;
