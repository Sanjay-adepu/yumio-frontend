import React, { useState, useEffect } from "react";
import "./Exploremenu.css";
import { Catagory, items } from "../../Assets/Catagory.js";
import Fooddisplay from "../Fooddisplay/Fooddisplay";

const Exploremenu = ({ searchQuery }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredItems, setFilteredItems] = useState(items); // Manage filtered items state

  useEffect(() => {
    // Filter items based on search query
    if (searchQuery) {
      const filtered = items.filter((item) => 
        item.catagory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(items); // Reset if no search query
    }
  }, [searchQuery]);

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
              onClick={() => handleItemClick(item.catagory)}
            >
              <img src={item.image} alt={item.catagory} />
              <div>{item.catagory}</div>
            </div>
          );
        })}
      </div>

      {/* Display filtered items */}
      <Fooddisplay items={filteredItems} selectedCategory={selectedCategory} />

      <hr />
    </div>
  );
};

export default Exploremenu;
