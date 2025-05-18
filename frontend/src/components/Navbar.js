import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Navbar({ loggedIn, setLoggedIn }) {
  // Handle Logout function to Log the user out 
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
      setLoggedIn(false); // Update the Login state
    } catch (err) {
      console.error('Error logging out', err);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <span className="navbar-brand">📝 Text Summarizer</span>
        <div className="d-flex">
          {loggedIn ? (
            <>
              <Link to="/" className="btn btn-outline-light mx-2">
                Home
              </Link>
              <Link to="/summarizer" className="btn btn-outline-light mx-2">
                Summarizer
              </Link>
              <Link to="/login" className="btn btn-danger" onClick={handleLogout}>
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-light mx-2">
                Login
              </Link>
              <Link to="/register" className="btn btn-outline-light">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

