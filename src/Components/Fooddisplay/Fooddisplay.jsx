import React, { useContext, useState, useEffect } from "react";
import "./Fooddisplay.css";
import axios from "axios";
import { StoreContext } from "../../Context/StoreContext";

const Fooddisplay = ({ selectedCategory }) => {
  const url = "http://localhost:4500"; // Backend API URL
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const [Data, setData] = useState([]);

  // Fetch food data from the backend
  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}/food/getfood`);
      const data = response.data.data;
      console.log("Fetched Data:", data); // Check if data is coming from the backend
      setData(data); // Store data in state
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  // Call fetchData when the component mounts
  useEffect(() => {
    fetchData(); // Fetch data once on mount
  }, []); // Empty dependency array ensures it runs only once on mount

  // Debugging logs
  console.log("Selected Category:", selectedCategory);
  console.log("Data Items:", Data); // Log all data items

  // Filter items based on the selected category (case-insensitive comparison)
  const filteredItems = selectedCategory
    ? Data.filter((item) => item.category?.toLowerCase() === selectedCategory.toLowerCase())
    : Data; // If no category selected, show all items

  console.log("Filtered Items:", filteredItems); // Log filtered items

  return (
    <div>
      <h1 id="head">Top dishes near you</h1>
      {filteredItems.length === 0 ? (
        <p>No items available</p>
      ) : (
        <div className="items">
          {filteredItems.map((item) => (
            <div key={item._id} className="item-card">
              <img src={`${url}/${item.image}`} alt={item.name} />
              <h3>{item.name}</h3>
              <h2>₹{item.price}</h2>
              <p>{item.description}</p>

              <div className="rating-container">
                <img src="./rating.png" alt="Rating Star" />
              </div>

              <div className="quantity-control">
                <button onClick={() => removeFromCart(item._id)}>-</button>
                <span>{cartItems[item._id] || 0}</span>
                <button onClick={() => addToCart(item._id)}>+</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Fooddisplay;