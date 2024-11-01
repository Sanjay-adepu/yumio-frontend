import React, { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import "./Cart.css";
import Navbar from "../../Components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, getTotalCartAmount, foodItems } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
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
          {foodItems.map((item) => {
            const quantity = cartItems[item._id] || 0;

            if (quantity > 0) {
              return (
                <div key={item._id} className="cart-items-title cart-items-item">
                  <img src={`https://sanjay-adepu-yumio.onrender.com/cart/uploads/${item.image}`} alt={item.name} />
                  <p>{item.name}</p>
                  <p>₹{item.price.toFixed(2)}</p>
                  <p>{quantity}</p>
                  <p>₹{(item.price * quantity).toFixed(2)}</p>
                  <button onClick={() => removeFromCart(item._id)}>Remove</button>
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
              <p>₹{getTotalCartAmount() === 0 ? 0 : 100.03}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b id="total">Total</b>
              <b id="total">₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 100.03}</b>
            </div>
          </div>
          <button id="red" onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </>
  );
};

export default Cart;