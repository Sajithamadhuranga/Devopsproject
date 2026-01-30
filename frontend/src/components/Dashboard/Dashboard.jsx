import React, { useState } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const [orders] = useState([
    {
      id: "SS-101",
      date: "2025-08-10",
      items: ["Cardamom", "Black Pepper"],
      total: 120.5,
      status: "Delivered",
    },
    {
      id: "SS-102",
      date: "2025-08-15",
      items: ["Garam Masala"],
      total: 75.0,
      status: "Processing",
    },
  ]);

  const user = {
    name: "Sajitha Traders",
    role: "Spice Distributor",
    email: "contact@spicystock.lk",
    phone: "+94 77 123 4567",
    location: "Colombo, Sri Lanka",
  };

  return (
    <div className="dashboard-container">
      <div className="profile-section">
        <h2>🌶️ My Profile</h2>
        <p><strong>Business Name:</strong> {user.name}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Location:</strong> {user.location}</p>
      </div>

      <div className="orders-section">
        <h2>📦 Spice Orders</h2>
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Spices</th>
              <th>Total (USD)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.date}</td>
                <td>{order.items.join(", ")}</td>
                <td>${order.total.toFixed(2)}</td>
                <td className={
                  order.status === "Delivered"
                    ? "status-delivered"
                    : "status-processing"
                }>
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="notifications-section">
        <h2>🔔 Notifications</h2>
        <ul>
          <li>🟢 Order SS-101 delivered.</li>
          <li>🕒 Order SS-102 processing.</li>
          <li>⚠️ Low stock: Turmeric.</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
