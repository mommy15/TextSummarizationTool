import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Summarizer from './components/Summarizer';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/Register';
import './App.css';
import axios from 'axios';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  // Check if user is logged in on component mount
  useEffect(() => {
    const checkLoggedInStatus = async () => {
      try {
        // Fetch login status from your server or localStorage
        const response = await axios.get('http://localhost:5000/status', { withCredentials: true });
        if (response.data.loggedIn) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoggedInStatus();
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Routes>
          {/* Simplified the route */}
          <Route path="/" element={<Home setLoggedIn={setLoggedIn} />} />
          <Route path="/Summarizer" element={<Summarizer />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
