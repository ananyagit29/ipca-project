import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ipcaLogo from '../assets/ipca_logo.png';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        alert('Login successful!');
        navigate('/dashboard');
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Failed to connect to the server');
    }
  };

  return (
    <div className="auth-page">
      <section className="auth-panel" aria-labelledby="login-title">
        <div className="brand-lockup">
          <h1 id="login-title">IPCA Project</h1>
          <img className="brand-logo" src={ipcaLogo} alt="IPCA Project logo" />
          <p className="auth-kicker">Welcome User.</p>
        </div>

        <form className="auth-form" onSubmit={handleLogin}>
          <label className="field">
            <span>Email Address</span>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="field">
            <span>Password</span>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button className="primary-button" type="submit">
            Login
          </button>
        </form>

        <p className="auth-link">
          New user? <Link to="/signup">Create an account</Link>
        </p>
        <p className="auth-footer">Developed by Ananya - 2026</p>
      </section>
    </div>
  );
};

export default Login;
