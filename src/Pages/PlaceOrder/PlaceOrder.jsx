import Navbar from "../../Components/Navbar/Navbar";
import { useContext, React } from "react";
import { StoreContext } from "../../Context/StoreContext";
import "./Placeorder.css";

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);
  return (
    <>
      <Navbar />
      <form className="order-form">
        <div className="form-section">
          <p className="form-title">Delivery Information</p>
          <div className="form-fields-group">
            <input type="text" className="input-field" placeholder="First name" />
            <input type="text" className="input-field" placeholder="Last name" />
          </div>
          <input type="email" className="input-field" placeholder="Email address" />
          <input type="text" className="input-field" placeholder="Street" />
          <div className="form-fields-group">
            <input type="text" className="input-field" placeholder="City" />
            <input type="text" className="input-field" placeholder="State" />
          </div>
          <div className="form-fields-group">
            <input type="text" className="input-field" placeholder="Zip code" />
            <input type="text" className="input-field" placeholder="Country" />
          </div>
          <input type="text" className="input-field" placeholder="Phone" />
        </div>

        <div className="order-summary">
          <div className="summary-details">
            <h2 className="summary-title">Cart Totals</h2>
            <div className="summary-items">
              <div className="summary-item">
                <p className="item-label">Subtotal</p>
                <p className="item-value">₹{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="summary-item">
                <p className="item-label">Delivery Fee</p>
                <p className="item-value">
                  ₹{getTotalCartAmount() === 0 ? 0 : 100.03}
                </p>
              </div>
              <hr />
              <div className="summary-item">
                <b className="item-total-label">Total</b>
                <b className="item-total-value">
                  ₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 100.03}
                </b>
              </div>
            </div>
            <button className="payment-button">PROCEED TO PAYMENT</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default PlaceOrder;