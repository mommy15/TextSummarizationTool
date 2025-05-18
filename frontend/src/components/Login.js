import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setLoggedIn }) {
  // Local state for input fields and error messages
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to login
      const response = await axios.post('http://localhost:5000/login', { email, password }, { withCredentials: true });
      
      // If successful, setLoggedIn to true
      if (response.status === 200) {
        setLoggedIn(true);
        navigate('/'); // Redirect to home page after successful login
      }
    } catch (err) {
      // Handle any errors (e.g., invalid credentials)
      setError('Invalid credentials');
    }
  };

  return (
    <div className="container mt-5">
      <h3>Login</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="form-control mb-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
}

export default Login;


