import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Navbar from "../Navbar/Navbar.jsx";


import bgImage from "../../assets/bg.png";

const Home = () => {
  return (
   
    <div className="homePage" style={{ backgroundImage: `url(${bgImage})` }}>
       <Navbar/>

      <div className="heroContainer">
        <div className="heroSection">
          <h1 className="heroTitle">Welcome</h1>
        </div>

      
        <Link to="/signup" className="exploreButton">
          Explore More <span className="arrow">≫</span>
        </Link>
      </div>
    </div>
  );
};

export default Home;
