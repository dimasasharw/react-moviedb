import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/navbar.css";


const Navbar = () => {
  const navigate = useNavigate()
  const sessionId = localStorage.getItem("sessionId");

  const handleLogout = () => {
    localStorage.removeItem("sessionId");
    localStorage.removeItem("accountId");
    navigate('/')
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div>
          <Link className="logo" to="/">
            CINEMA
          </Link>
        </div>
        <div className="tabs">
          {sessionId ? (
            <>
              <Link className="tab" to="/favorite">
                Favorite
              </Link>
              <Link className="tab" to="/watchlist">
                Watchlist
              </Link>
              <button className="tab" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="tab" to="/login">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
