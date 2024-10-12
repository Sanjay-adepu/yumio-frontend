import React, { useState, useEffect } from "react";
import "./Exploremenu.css";
import { Catagory } from "../../Assets/Catagory.js"; // Assuming this contains categories
import Fooddisplay from "../Fooddisplay/Fooddisplay"; // Assuming this is the component that displays food items

const Exploremenu = ({ searchQuery }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Handle category click event
  const handleItemClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="exploremenu">
      <h1>Explore our menu</h1>
      <p> 
        Choose from a diverse menu featuring a delectable array of dishes. Our
        mission is to satisfy your cravings and elevate your dining experience,
        one delicious meal at a time.
      </p>

      <div className="exploremenu-list">
        {Catagory.map((item, index) => {
          return (
            <div
              key={index}
              className={`menu-item ${selectedCategory === item.catagory ? "selected" : ""}`}
              onClick={() => handleItemClick(item.catagory)} // Handle category selection
            >
              <img src={item.image} alt={item.catagory} />
              <div>{item.catagory}</div>
            </div>
          );
        })}
      </div>

      {/* Pass selectedCategory to Fooddisplay */}
      <Fooddisplay selectedCategory={selectedCategory} />

      <hr />
    </div>
  );
};

export default Exploremenu;