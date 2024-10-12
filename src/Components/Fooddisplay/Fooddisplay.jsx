import React, { useContext } from "react";
import "./Fooddisplay.css";
import axios from "axios";
import { StoreContext } from "../../Context/StoreContext";




const Fooddisplay = ({ selectedCategory }) => {
  const { cartItems, addToCart, removeFromCart,url } = useContext(StoreContext);

const [Data,setdata] = useState([])

const fetchdata= async()=>{
  try{
    const response = await axios.get(`${url}/food/getfood`);
    const data=response.data;
       setdata(data);
  }catch(error){
    console.log(error);
    
  }

}







  // Filter items based on selected category
  const filteredItems = selectedCategory
    ? Data.filter((item) => item.catagory === selectedCategory)
    : items;

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