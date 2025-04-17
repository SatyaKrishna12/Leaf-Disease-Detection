import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/scss/styles.scss';
import API from '../utils/api';

function RegistrationPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/users/register', formData);
      alert('Registration successful!');
      navigate('/login');
    } catch (err) {
      alert('Registration failed!');
    }
  };

  const onLoginClick = () => navigate('/login'); // ✅ Defined inside the component
  return (
    <section className="login ">
      <div className="login__box">
        <h2 className="section__title">Register</h2>

        <form onSubmit={handleSubmit} className="login__form">
          <div className="login__input-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="login__input-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="login__input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="login__input-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="login__input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="button button--flex login__btn">
            Register
          </button>
          <p className="login__register-text">
            Have an account?{' '}
            <span className="login__register-link" onClick={onLoginClick}>
              Login
            </span>
          </p>
        </form>
      </div>
    </section>
  );
}

export default RegistrationPage;
