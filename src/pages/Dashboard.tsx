import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('User logged out');
    navigate('/login');
  };

  return (
    <main className="dashboard-page">
      <section className="dashboard-panel">
        <p className="eyebrow">IPCA Project</p>
        <h2>Welcome to your Dashboard!</h2>
        <p>You have successfully logged in.</p>
        <button className="danger-button" onClick={handleLogout}>
        Logout
        </button>
      </section>
    </main>
  );
};

export default Dashboard;
