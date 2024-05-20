import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await axios.post('http://localhost:5000/register', { username, password });
      navigate('/');
    } catch (err) {
      setError('Registration failed');
    }
  };
  return (
    <div className="login-container"> 
      <form onSubmit={handleSubmit} className="login-form"> 
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input" 
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input" 
        />
        <input
          type="password"
          placeholder="Confirm Password" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="login-input" 
        />
        <button type="submit" className="login-button"> 
          Register
        </button>
        {error && <p className="error">{error}</p>} 
      </form>
    </div>
  );
};
export default Register;
