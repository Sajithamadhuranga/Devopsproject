import React from "react";
import "./Footer.css";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>Spicy</h3>
        <p>
          Transform Your Spice Business At Any Time. Success In Short, Simple
          Right With Spice Stock.
        </p>
      </div>
      <div className="footer-section">
        <h4>Company</h4>
        <ul>
         <li>
  <Link to="/about">About Us</Link>
</li>

          <li><Link to="/stock" className="navLink">Spicy Store</Link></li>
          <li>Our Offers</li>
          <li>
  <Link to="/contact" className="navLink">Contact</Link>
</li>

        </ul>
      </div>
      <div className="footer-section">
        <h4>Branches</h4>
        <ul>
          <li>Galle</li>
          <li>Colombo</li>
          <li>Kandy</li>
          <li>Ratnapura</li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>Extra Links</h4>
        <ul>
          <li>Customer Support</li>
          <li>Privacy Policy</li>
          <li>Terms & Conditions</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
