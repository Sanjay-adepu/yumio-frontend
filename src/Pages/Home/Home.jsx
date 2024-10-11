import React, { useState } from "react";
import { useRef } from 'react';
import Header from "../../Components/Header/Header";
import Fooddisplay from "../../Components/Fooddisplay/Fooddisplay";
import Exploremenu from "../../Components/Exploremenu/Exploremenu";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const Home = () => {
  const footerRef = useRef(null); //
  
  
  
  const [searchQuery, setSearchQuery] = useState(""); // Declare state

  return (
    <div className="home">
      <Navbar onSearch={setSearchQuery}
      footerRef={footerRef}/>
      <Header />
      <Exploremenu searchQuery={searchQuery} />
      <Footer ref={footerRef} / >
    </div>
  );
};

export default Home;