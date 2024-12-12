import React, { useState } from "react";
import Sidebar from "../components/marketplace/Sidebar";
import TransactionsView from "../components/marketplace/TransactionsView";
import ProductsView from "../components/marketplace/ProductsView";
import Listings from "../components/marketplace/Listings";
import "../styles/Marketplace.css";

const Marketplace = () => {
  const [activeView, setActiveView] = useState("products");

  const renderView = () => {
    switch (activeView) {
      case "transactions":
        return <TransactionsView />;
      case "products":
        return <ProductsView />;
      case "listings":
        return <Listings />;
      default:
        return <TransactionsView />;
    }
  };

  return (
    <div className="marketplace-container">
      <div className="marketplace-layout">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
        <div className="content">{renderView()}</div>
      </div>
    </div>
  );
};

export default Marketplace;
