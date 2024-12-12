import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/TransactionsView.css";

const Marketplace = () => {
  const [activeView, setActiveView] = useState("buyer");
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTransactions();
  }, [activeView]);

  const fetchTransactions = async () => {
    try {
      const baseURL = "http://localhost:3005";
      const endpoint =
        activeView === "buyer"
          ? "/api/transactions/buyer"
          : "/api/transactions/seller";

      const response = await axios.get(`${baseURL}${endpoint}`, {
        headers: {
          Authorization: token,
        },
      });
      setTransactions(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      if (error.response && error.response.status === 400) {
        setError("Login to access transactions!");
      }
    }
  };

  return (
    <div className="marketplace-container">
      <h1>Transactions</h1>

      <div className="button-container">
        <button
          className={`view-button ${activeView === "buyer" ? "active" : ""}`}
          onClick={() => setActiveView("buyer")}
        >
          Buyer
        </button>
        <button
          className={`view-button ${activeView === "seller" ? "active" : ""}`}
          onClick={() => setActiveView("seller")}
        >
          Seller
        </button>
      </div>

      <div className="table-container">
        {error ? (
          <div className="message error">{error}</div>
        ) : transactions.length === 0 ? (
          <div className="message">No transactions found</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Product ID</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>{activeView === "buyer" ? "Seller" : "Buyer"} ID</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.id}</td>
                  <td>{transaction.product_id}</td>
                  <td>${transaction.amount}</td>
                  <td>{transaction.payment_method}</td>
                  <td>
                    {activeView === "buyer"
                      ? transaction.seller_uid
                      : transaction.buyer_uid}
                  </td>
                  <td>
                    <span
                      className={`status-${transaction.status.toLowerCase()}`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td>{new Date(transaction.created_at).toLocaleString()}</td>
                  <td>{new Date(transaction.updated_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
