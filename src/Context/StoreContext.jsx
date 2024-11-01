import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [foodItems, setFoodItems] = useState([]); // Store food items

  const url = "https://yumio-backend.onrender.com";

  // Fetch food items from API 
  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get(`${url}/food/getfood`);
        if (response.data.success) {
          setFoodItems(response.data.data); // Save food items in context
        } else {
          console.error("Failed to fetch food items:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    };

    fetchFoodItems();
  }, []);

  

const updateCartInBackend = async (newCart) => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      await axios.put(`${url}/user/update-cart`, { cartlist: newCart }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  }
};

// Add to Cart
const addToCart = (itemId) => {
  setCartItems((prev) => {
    const updatedCart = { ...prev, [itemId]: (prev[itemId] || 0) + 1 };
    updateCartInBackend(updatedCart); // Save updated cart to backend
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save cart in localStorage
    return updatedCart;
  });
};

// Remove from Cart
const removeFromCart = (itemId) => {
  setCartItems((prev) => {
    const updatedCart = { ...prev, [itemId]: prev[itemId] - 1 };
    updateCartInBackend(updatedCart); // Save updated cart to backend
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save cart in localStorage
    return updatedCart;
  });
};




  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = foodItems.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

useEffect(() => {
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    setCartItems(JSON.parse(storedCart)); // Load saved cart from localStorage
  }
}, []);



  return (
    <StoreContext.Provider
      value={{ cartItems, addToCart, removeFromCart, getTotalCartAmount, foodItems }}
    >
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;