import React, { useState } from 'react';
import './Loginpopup.css';


const link = "http://localhost:4500";

const Loginpopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
const [data,setdata]=useState({
  name:"",
  gmail:"",
  password:""
});

const onchangehandler = (event)=>{
  const name = event.target.name;
  const value = event.target.value;
  
  setdata(item=>({...item,[name]:value}))
}

const onsubmithandler =async()=>{
  const url = currState===Login ? `${link}/login `: `${link}/register`;
  
  
  
  
}



  return (
    <div className="login-popup">
      <div className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img 
            onClick={() => setShowLogin(false)} 
            src="./close.png"
            alt="close-icon" />
          
        </div>

        <div className="login-popup-inputs">
          <form>
          {currState === "Login" ? (
            <>
              
              <input type="gmail" placeholder="Your email" required />
              <input type="password" placeholder="Password" required />
            </>
          ) : (
            <>
              <input type="text" placeholder="Your name" required />
              <input type="gmail" placeholder="Your gmail" required />
              <input type="password" placeholder="Password" required />
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