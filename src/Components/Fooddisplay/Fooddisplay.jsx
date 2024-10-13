import React, { useContext } from "react";
import "./Fooddisplay.css";
import { StoreContext } from "../../Context/StoreContext";

const Fooddisplay = () => {
  const { cartItems, addToCart, removeFromCart, foodItems } = useContext(StoreContext);

  const url = "http://localhost:4500";

  // Define the removefood function (for future functionality if needed)
  const removefood = (id) => {
    console.log("Removing food with ID:", id);
  };

  return (
    <div>
      <h1 id="head">Top dishes near you</h1>
      <div className="items">
        {foodItems.length > 0 ? (
          foodItems.map((item, index) => (
            <div key={index} className="foodtable">
              <div onClick={() => removefood(item._id)}>Remove</div>
              <img
                src={`${url}/uploads/${item.image}`}
                alt={item.name}
              />
              <p>
                <span>Name:</span> {item.name}
              </p>
              <p>
                <span>Price:</span> ₹{item.price}
              </p>
              <p>
                <span>Description:</span> {item.description}
              </p>
              <p>
                <span>Category:</span> {item.category}
              </p>
              <div className="quantity-control">
                <button onClick={() => removeFromCart(item._id)}>-</button>
                <span>{cartItems[item._id] || 0}</span>
                <button onClick={() => addToCart(item._id)}>+</button>
              </div>
            </div>
          ))
        ) : (
          <p>No food items available.</p>
        )}
      </div>
    </div>
  );
};

export default Fooddisplay;