import React, { useContext, useState, useEffect } from "react";
import "./Fooddisplay.css";
import axios from "axios";
import { StoreContext } from "../../Context/StoreContext";



const Fooddisplay = ({ selectedCategory }) => {

const url ="http://localhost:4500"

  const { cartItems, addToCart, removeFromCart} = useContext(StoreContext);
  const [Data, setData] = useState([]);

  // Fetch food data
  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}/food/getfood`);
      const data = response.data;
      console.log("this is data", data); // Ensure data is logged correctly
      setData(data); // Set data to state
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  // Call fetchData only once on component mount
  useEffect(() => {
    fetchData(); // No need to pass Data or any argument here
  }, []); // Empty dependency array ensures it runs only once on mount

  // Filter items based on selected category
  const filteredItems = selectedCategory
    ? Data.filter((item) => item.category === selectedCategory)
    : Data;

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