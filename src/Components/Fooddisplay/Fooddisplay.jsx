import React, { useContext } from "react";
import "./Fooddisplay.css";
import { StoreContext } from "../../Context/StoreContext";

const Fooddisplay = ({ selectedCategory }) => {
  const { cartItems, addToCart, removeFromCart, foodItems } = useContext(StoreContext);

  const url = "http://localhost:4500";

  // Filter food items based on selected category
  const filteredItems = selectedCategory
    ? foodItems.filter((item) => item.category === selectedCategory)
    : foodItems;

  return (
    <div>
      <h1 id="head">Top dishes near you</h1>
      <div className="items">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <div key={index} className="foodtable">
              <div onClick={() => console.log("Removing food with ID:", item._id)}>Remove</div>
              <img
                src={`${url}/uploads/${item.image}`}
                alt={item.name}
              />
              <h2> {item.name}
              </h2>
              <h3>
                ₹{item.price}
              </3>
              <p>
                 {item.description}
              </p>
              <img src="./rating.png" alt="rating stars "/>
              <div className="quantity-control">
                <button onClick={() => removeFromCart(item._id)}>-</button>
                <span>{cartItems[item._id] || 0}</span>
                <button onClick={() => addToCart(item._id)}>+</button>
              </div>
            </div>
          ))
        ) : (
          <p>No food items available in this category.</p>
        )}
      </div>
    </div>
  );
};

export default Fooddisplay;