import React, { useState } from "react";
import Sidebar from "../components/marketplace/Sidebar";
import TransactionsView from "../components/marketplace/TransactionsView";
import ProductsView from "../components/marketplace/ProductsView";
import "../styles/Marketplace.css";

const Marketplace = () => {
  const [activeView, setActiveView] = useState("transactions");

  return (
    <div className="marketplace-container">
      <div className="marketplace-layout">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
        <div className="content">
          {activeView === "transactions" ? (
            <TransactionsView />
          ) : (
            <ProductsView />
          )}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
