import React, { useState } from "react";
import "./Contact.css";
import Navbar from "../Navbar/Navbar";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", form);
    alert("Thank you for reaching out! We will get back to you soon.");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="contact-container">
      <Navbar />
      <div className="contact-box">
        <h2>Contact Us</h2>
        <p>Have any questions? We'd love to hear from you. Send us a message!</p>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="+94 77 123 4567"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Your message here..."
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="contact-btn">Send Message</button>
        </form>

        {/* Contact Info */}
        <div className="contact-info">
          <h3>Our Contact Information</h3>
          <div className="info-item">
            <strong>Email:</strong> support@spicestock.com
          </div>
          <div className="info-item">
            <strong>Phone:</strong> +94 (0)11 234 5678
          </div>
          <div className="info-item">
            <strong>Address:</strong> Colombo, Sri Lanka
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
