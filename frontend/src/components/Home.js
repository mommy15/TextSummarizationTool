import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Home component recieves setLoggedin prop to update the Login status
// and uses useEffect to check if the user is Logged in or not
function Home({ setLoggedIn }) {
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // On component mount, to check login status
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Check if the user is Logged in by making a request to the server 
        await axios.get('http://localhost:5000/', { withCredentials: true });
        setIsLoggedIn(true);
        setMessage('Welcome to the Summarizer Tool!');
      } catch (err) {
        setIsLoggedIn(false);
        setMessage('Please log in or register to continue.');
      }
    };

    checkAuthStatus();
  }, []);
  // Logout function to handle user Logout
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
      setLoggedIn(false);
      setIsLoggedIn(false);
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
      setMessage('Error while logging out. Please try again.');
    }
  };
  // Function to navigate to the Summarizer tool
  const goToSummarizer = () => {
    navigate('/summarizer');
  };

  // Inline styling for the component UI
  const styles = {
    container: {
      maxWidth: '600px',
      margin: '80px auto',
      padding: '40px',
      backgroundColor: '#f8f9fa',
      borderRadius: '10px',
      textAlign: 'center',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    heading: {
      fontSize: '28px',
      marginBottom: '20px',
      color: '#333',
    },
    messageBox: {
      padding: '15px',
      borderRadius: '6px',
      backgroundColor: '#e9ecef',
      marginBottom: '20px',
      fontSize: '16px',
    },
    button: {
      margin: '10px',
      padding: '10px 20px',
      fontSize: '16px',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
    },
    logoutButton: {
      backgroundColor: '#dc3545',
      color: 'white',
    },
    successButton: {
      backgroundColor: '#28a745',
      color: 'white',
    },
    loginButton: {
      backgroundColor: '#007bff',
      color: 'white',
    },
    registerButton: {
      backgroundColor: '#6c757d',
      color: 'white',
    },
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Home</h3>
      <div style={styles.messageBox}>{message}</div>

      {isLoggedIn ? (
        <div>
          <button style={{ ...styles.button, ...styles.logoutButton }} onClick={handleLogout}>
            Logout
          </button>
          <button style={{ ...styles.button, ...styles.successButton }} onClick={goToSummarizer}>
            Go to Summarizer Tool
          </button>
        </div>
      ) : (
        <div>
          <button style={{ ...styles.button, ...styles.loginButton }} onClick={() => navigate('/login')}>
            Login
          </button>
          <button style={{ ...styles.button, ...styles.registerButton }} onClick={() => navigate('/register')}>
            Register
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
