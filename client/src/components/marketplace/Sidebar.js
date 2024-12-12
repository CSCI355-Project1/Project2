// src/components/Sidebar.js
import React from "react";
import "../../styles/Sidebar.css";

const Sidebar = ({ activeView, setActiveView }) => {
  return (
    <div className="sidebar">
      <div
        className={`sidebar-item ${
          activeView === "transactions" ? "active" : ""
        }`}
        onClick={() => setActiveView("transactions")}
      >
        Transactions
      </div>
      <div
        className={`sidebar-item ${activeView === "products" ? "active" : ""}`}
        onClick={() => setActiveView("products")}
      >
        Products
      </div>
    </div>
  );
};

export default Sidebar;
