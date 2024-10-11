import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Cart from "./Pages/Cart/Cart";
import Home from "./Pages/Home/Home";
import "./App.css";
import Exploremenu from "./Components/Exploremenu/Exploremenu";
import PlaceOrder from "./Pages/PlaceOrder/PlaceOrder";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";

function App() {
   

  return (
    <div className="app">
    

      <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route path="/menu" element={<Exploremenu />} />
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<PlaceOrder />} />
      </Routes>

    
    </div>
  );
}

export default App;