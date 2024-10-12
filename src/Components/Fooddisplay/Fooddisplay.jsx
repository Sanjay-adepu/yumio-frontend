import React, { useEffect, useState, useContext } from "react";
import "./Fooddisplay.css";
import { StoreContext } from "../../Context/StoreContext";

const Fooddisplay = ({ selectedCategory }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the backend
    const fetchFoodItems = async () => {
      try {
        const response = await fetch("http://localhost:4500/food/getfood");
        if (!response.ok) {
          throw new Error("Failed to fetch food items");
        }
        const data = await response.json();
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodItems();
  }, []);

  // Filter items based on selected category
  const filteredItems = selectedCategory
    ? items.filter((item) => item.catagory === selectedCategory)
    : items;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1 id="head">Top dishes near you</h1>
      <div className="items">
        {filteredItems.map((item) => (
          <div key={item.id} className="item-card">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <h2>₹{item.price}</h2>
            <p>{item.description}</p>

            {/* Small star rating placed at the bottom right */}
            <div className="rating-container">
              <img src="/rating.png" alt="Rating Star" />
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