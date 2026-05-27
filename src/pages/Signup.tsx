import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ipcaLogo from '../assets/ipca_logo.png';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        alert('Registration successful!');
        navigate('/login');
      } else {
        const errorData = await response.text();
        alert(errorData);
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Failed to connect to the server');
    }
  };

  return (
    <div className="auth-page">
      <section className="auth-panel auth-panel--compact" aria-labelledby="signup-title">
        <div className="brand-lockup">
          <h1 id="signup-title">IPCA Project</h1>
          <img className="brand-logo brand-logo--small" src={ipcaLogo} alt="IPCA Project logo" />
          <p className="auth-kicker">Create your account to get started.</p>
        </div>

        <form className="auth-form" onSubmit={handleSignup}>
          <label className="field">
            <span>Full Name</span>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button className="primary-button" type="submit">
            Sign Up
          </button>
        </form>

        <p className="auth-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
        <p className="auth-footer">Developed by Ananya - 2026</p>
      </section>
    </div>
  );
};

export default Signup;
