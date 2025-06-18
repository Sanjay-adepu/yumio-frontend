import React, { useState } from 'react';
import './Loginpopup.css';
import axios from "axios";

const link = "https://yumio-backend.vercel.app"; // Ensure this is your backend URL

const Loginpopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const onchangehandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(item => ({ ...item, [name]: value }));
  }

  const onsubmithandler = async (event) => {
  event.preventDefault(); // Prevent page reload
  const url = currState === "Login" ? `${link}/user/login` : `${link}/user/register`;

  try {
    const response = await axios.post(url, data);

    if (response.data.success) {
      alert(response.data.message);

      // Save the token and cart data in localStorage
      const token = response.data.token;
      localStorage.setItem('token', token); // Save token
      localStorage.setItem('cart', JSON.stringify(response.data.cartlist)); // Save cart data

      setShowLogin(false); // Close login popup
    } else {
      alert(response.data.message);
    }
  } catch (error) {
    alert("Error occurred, try again later");
  }
};

  return (
    <div className="login-popup">
      <div className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img 
            onClick={() => setShowLogin(false)} 
            src="./close.png"
            alt="close-icon" 
          />
        </div>

        <div className="login-popup-inputs">
          <form onSubmit={onsubmithandler}>
            {currState === "Login" ? (
              <>
                <input type="email" onChange={onchangehandler} name="email" value={data.email} placeholder="Your email" required />
                <input type="password" onChange={onchangehandler} name="password" value={data.password} placeholder="Password" required />
              </>
            ) : (
              <>
                <input type="text" name="name" onChange={onchangehandler} value={data.name} placeholder="Your name" required />
                <input type="email" onChange={onchangehandler} name="email" value={data.email} placeholder="Your email" required />
                <input type="password" onChange={onchangehandler} name="password" value={data.password} placeholder="Password" required />
              </>
            )}
            <button type='submit'>{currState === "Sign Up" ? "Create account" : "Login"}</button>
          </form>
        </div>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        <p>
          {currState === "Login" 
            ? "Create a new account? " 
            : "Already have an account? "}
          <span onClick={() => setCurrState(currState === "Login" ? "Sign Up" : "Login")}>
            {currState === "Login" ? "Click here" : "Login here"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Loginpopup;