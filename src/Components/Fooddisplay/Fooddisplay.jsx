import React, { useEffect, useState, useContext } from "react";
import "./Fooddisplay.css";
import axios from "axios";
import { StoreContext } from "../../Context/StoreContext";

const Fooddisplay = () => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const [data, setData] = useState([]);  // State to hold food data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch food data from backend API
  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        const response = await axios.get("http://localhost:4500/food/getfood");
        setData(response.data.data);  // Assuming the data is in response.data.data
        setLoading(false);
      } catch (error) {
        setError("Failed to load food items");
        setLoading(false);
      }
    };

    fetchFoodData();
  }, []);

  // Render loading or error message if necessary
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1 id="head">Top dishes near you</h1>
      <div className="items">
        {data.map((item) => (
          <div key={item.id} className="item-card">
            {/* Use backend uploads folder for image */}
            <img 
              src={`http://localhost:4500/${item.image}`}  // Assuming item.image is something like "uploads/image1.jpg"
              alt={item.name} 
            />
            <h3>{item.name}</h3>
            <h2>₹{item.price}</h2>
            <p>{item.description}</p>

            {/* Small star rating placed at the bottom right */}
            <div className="rating-container">
              <img src="./rating.png" alt="Rating Star" />
            </div>

            <div className="quantity-control">
              <button onClick={() => removeFromCart(item.id)}>-</button>
              <span>{cartItems[item.id] || 0}</span>
              <button onClick={() => addToCart(item.id)}>+</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fooddisplay;