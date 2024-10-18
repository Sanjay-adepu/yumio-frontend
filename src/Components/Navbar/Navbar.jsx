import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Loginpopup from "../Loginpopup/Loginpopup";

const Navbar = ({ onSearch, footerRef }) => {
  const [token, setToken] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);

  const handleSearchChange = (e) => {
    onSearch(e.target.value); // Pass the search query to parent
  };

  const scrollToFooter = () => {
    if (footerRef && footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null); // Reset token state
  };

  return (
    <>
      {showLogin && <Loginpopup setShowLogin={setShowLogin} />}
      <div>
        <div className="navbar">
          <div className="title">
            <Link id="home" to="/"><h1>Yumio</h1></Link>
          </div>
          <div className="elements">
            <ul className="list">
              <Link id="home" to="/">
                <li>Home</li>
              </Link>
              <li onClick={scrollToFooter} id="Contact">Contact Us</li>
            </ul>
          </div>
          <div className="logos">
          
            <Link to='/cart'>
              <img id="basket" src="./cartset.png" alt="shopping basket" />
            </Link>
          </div>

          {!token ? (
            <button id="button" onClick={() => setShowLogin(true)}>Sign In</button>
          ) : (
            <div className="profile">
              <img src="./profile.png" alt="profile" />
              <ul className="hide">
                <li><img src="./order.png" alt="orders" />orders</li>
                <li onClick={handleLogout}><img src="./logout.png" alt="logout" /> log out</li>
              </ul>
            </div>
          )}

          <img id="menu" onClick={toggleSidebar} src="./menu_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.png" alt="menu icon" />
        </div>

        {isSidebarVisible && (
  <div className="sidebar">
    <ul className="sidelist">
      <Link id="new" to="/">
        <li>Home</li>
      </Link>
      {!token ? (
        <li onClick={() => setShowLogin(true)}>Sign In</li>
      ) : (
        <li onClick={handleLogout}>log out</li>
      )}
      <li onClick={scrollToFooter}>Contact Us</li>
      <Link id="new" to="/cart">
        <li>Cart</li>
      </Link>
    </ul>
  </div>
)}
      </div>
    </>
  );
};

export default Navbar;