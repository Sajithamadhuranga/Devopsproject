import React from "react";
import "./About.css";
import Navbar from "../Navbar/Navbar";

const About = () => {
  return (
    <div className="aboutus-container">
      <Navbar/>
      <div className="aboutus-box">
        {/* Heading */}
        <h2 className="aboutus-heading">About Us</h2>
        <p className="aboutus-text">
          <strong>Spice Stock</strong> is a smart web-based system that
          streamlines spice inventory, sales, and distribution management.
        </p>

        {/* Mission */}
        <h3 className="aboutus-subheading">Our Mission</h3>
        <p className="aboutus-text">
          To empower spice businesses with modern tools that improve efficiency,
          reduce manual work, and support sustainable growth.
        </p>

        {/* Sections */}
        <div className="aboutus-sections">
          <div className="aboutus-card">
            <h4>Who We Serve</h4>
            <p>
              Spice Stock supports spice shops, wholesalers, distributors,
              exporters, and small to medium spice businesses. It offers
              powerful tools to manage operations efficiently, regardless of
              business size.
            </p>
          </div>

          <div className="aboutus-card">
            <h4>Key Features</h4>
            <p>
              Spice Stock provides real-time inventory control, sales tracking,
              and easy supplier and customer management. Its intuitive
              dashboard and analytics help you monitor business performance with
              ease.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="aboutus-stats">
          <div className="stat-item">
            <div className="stat-circle">5+</div>
            <span className="stat-label">Year Experience</span>
          </div>
          <div className="stat-item">
            <div className="stat-circle">4k</div>
            <span className="stat-label">Happy Clients</span>
          </div>
          <div className="stat-item">
            <div className="stat-circle">3.8</div>
            <span className="stat-label">Overall Rating</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
