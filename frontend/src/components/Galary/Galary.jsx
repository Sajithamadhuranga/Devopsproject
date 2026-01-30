import React from 'react';
import './Galary.css';

const Galary = () => {
  return (
    <div className="about-container">
      <section className="hero-section">
        <h1>About Us</h1>
        <p className="hero-text">
          Spice Stock Is A Smart Web-Based System That Streamlines Spice Inventory, Sales, And Distribution Management.
        </p>
      </section>

      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          To Empower Spice Businesses With Modern Tools That Improve Efficiency, Reduce Manual Work, And Support Sustainable Growth.
        </p>
      </section>

      <section className="serve-section">
        <h2>Who We Serve</h2>
        <p>
          Spice Stock Supports Spice Shops, Wholesalers, Distributors, Exporters, And Small To Medium Spice Businesses. 
          It Offers Powerful Tools To Manage Operations Efficiently, Regardless Of Business Size.
        </p>
      </section>

      <section className="stats-section">
        <div className="stat-item">
          <h3>5+</h3>
          <p>Year Experience</p>
        </div>
        <div className="stat-item">
          <h3>4k+</h3>
          <p>Happy Clients</p>
        </div>
      </section>

      <section className="features-section">
        <h2>Key Features</h2>
        <p>
          Spice Stock Provides Real-Time Inventory Control, Sales Tracking, And Easy Supplier And Customer Management. 
          Its Intuitive Dashboard And Analytics Help You Monitor Business Performance With Ease.
        </p>
      </section>

      <section className="rating-section">
        <div className="rating-item">
          <h3>3.8</h3>
          <p>Overall Rating</p>
        </div>
      </section>
    </div>
  );
};

export default Galary;