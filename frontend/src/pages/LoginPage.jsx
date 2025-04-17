import React, { useState } from 'react';
import '../assets/scss/styles.scss'; 
import API from '../utils/api';
import { setToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 


const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await API.post('/users/login', { email, password });
    setToken(res.data.token);
    navigate('/home'); 
  } catch (err) {
    alert("Login failed");
  }
};


  const onRegisterClick = () => navigate('/register'); 

  return (
    <section className="login">
      <div className="login__box">
        <h2 className="section__title">Login</h2>

        <form onSubmit={handleLogin} className="login__form">
          <div className="login__input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="login__input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="button button--flex login__btn">
            Login
          </button>

          <p className="login__register-text">
            Don’t have an account?{' '}
            <span className="login__register-link" onClick={onRegisterClick}>
              Register
            </span>
          </p>
        </form>
      </div>
    </section>
  );
}

export default LoginPage;
