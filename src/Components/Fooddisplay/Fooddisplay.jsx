import React, { useContext ,useEffect,useState} from "react";
import "./Fooddisplay.css";
import axios from "axios";
import { StoreContext } from "../../Context/StoreContext";




const Fooddisplay = () => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  
  const url = "http://localhost:4500";
  const [list, setList] = useState([]);
  

useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/food/getfood`);
        const data = response.data; // Correctly access the data

        console.log("API Response:", data); // Log response for debugging

        if (data.success) {
          setList(data.data); // Set the food list from the response
        } else {
          console.error("Failed to fetch food items:", data.message);
        }
      } catch (error) {
        console.error("Error fetching food list:", error);
      }
    };

    fetchData(); // Call the function to fetch data
  }, [url]); 






  // Filter items based on selected category


  return (
    <div>
      <h1 id="head">Top dishes near you</h1>
      <div className="items">
              {list.length > 0 ? (
        list.map((item, index) => (
          <div key={index} className="foodtable">
            <div onClick={()=>removefood(item._id)}>Remove</div>
             <img
              src={`${url}/uploads/${item.image}`} />
            <p><span>Name:</span>{item.name}</p>
            <p><span>Price:</span>{item.price}</p>
            <p><span>description :</span> {item.description}</p>
            <p><span>Category:</span>{item.category}</p>
            
          </div>
        ))
      ) : (
        <p>No food items available.</p>
      )}
      
        <div className="quantity-control">
              <button onClick={() => removeFromCart(item._id)}>-</button>
              <span>{cartItems[item.id] || 0}</span>
              <button onClick={() => addToCart(item._id)}>+</button>
            </div>
      </div>
    </div>
  );
};

export default Fooddisplay;