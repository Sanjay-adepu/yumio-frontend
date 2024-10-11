import { createContext, useState } from "react";
import {items} from "../Assets/Catagory.js";

export const StoreContext = createContext(null);


const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});

    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
    };

    const removeFromCart = (itemId) => {
  setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
};

const getTotalCartAmount = () => {
  let totalAmount = 0;
  for (const item in cartItems) {
    if (cartItems[item] > 0) {
      let itemInfo = items.find((product) => product.id === item);
      totalAmount += itemInfo.price * cartItems[item];
    }
  }
  return totalAmount;
};

    return (
        <StoreContext.Provider value={{ cartItems, addToCart, removeFromCart,getTotalCartAmount }}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;