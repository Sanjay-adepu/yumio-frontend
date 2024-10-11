import React, { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import "./Cart.css";
import Navbar from "../../Components/Navbar/Navbar";
import { items } from "../../Assets/Catagory.js"; // Adjust the import based on your file structure
import {useNavigate} from "react-router-dom";


const Cart = () => {
  const { cartItems, removeFromCart,getTotalCartAmount } = useContext(StoreContext);

const navigate=useNavigate();
  return (
    <>
     <Navbar/>
    <div className="cart">
     
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {items.map((item, index) => {
          // Ensure cartItems[item.id] exists and is greater than 0
          const quantity = cartItems[item.id] || 0;

          if (quantity > 0) {
            // Strip non-numeric characters from the price (like "$") before converting to number
            const price = parseFloat(item.price.replace(/[^0-9.-]+/g, "")); // Remove $ and other symbols

            // If price or quantity are invalid, skip this item
            if (isNaN(price) || isNaN(quantity)) {
              console.error(`Invalid price or quantity for item ${item.name}:`, item);
              return null;
            }

            return (
            <div>
              <div key={index} className="cart-items-title cart-items-item">
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
                <p>₹{price.toFixed(2)}</p> {/* Ensuring price is formatted */}
                <p>{quantity}</p>
                <p>₹{(price * quantity).toFixed(2)}</p> {/* Calculate total price */}
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
                
              </div>
            
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
    
    <div className="cart-bottom">
  <div className="cart-total">
    <h2>Cart Totals</h2>
    <div>
      
        <div className="cart-total-details">
  <p>Subtotal</p>
  <p>₹{getTotalCartAmount()}</p>
</div>
<hr />
<div className="cart-total-details">
  <p>Delivery Fee</p>
  <p>₹{getTotalCartAmount()===0?0:100.03}</p>
</div>
<hr />
<div className="cart-total-details">
  <b id="total">Total</b>
  <b id="total">₹{getTotalCartAmount()===0?0:getTotalCartAmount() + 100.03}</b>
</div>
        
    </div>
    <button id="red" onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
  </div>
</div>
    </>
  );
};

export default Cart;


