import React, { useContext, useState, useEffect } from "react";
import "./Fooddisplay.css";
import { StoreContext } from "../../Context/StoreContext";

const Fooddisplay = ({ selectedCategory }) => {
  const url = "http://localhost:4500/food/getfood"; // Backend API URL
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch food data from the backend
  const fetchData = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log("Fetched Data:", result.data); // Check if data is coming from the backend
      setData(result.data); // Store data in state
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message); // Set error message
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Call fetchData when the component mounts
  useEffect(() => {
    fetchData(); // Fetch data once on mount
  }, []); // Empty dependency array ensures it runs only once on mount

  // Filter items based on the selected category (case-insensitive comparison)
  const filteredItems = selectedCategory
    ? data.filter((item) => item.category?.toLowerCase() === selectedCategory.toLowerCase())
    : data; // If no category selected, show all items

  return (
    <div>
      <h1 id="head">Top dishes near you</h1>
      {loading && <p>Loading...</p>} {/* Show loading state */}
      {error && <p>Error: {error}</p>} {/* Show error message */}
      {filteredItems.length === 0 && !loading ? (
        <p>No items available</p> // Show message if no items
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