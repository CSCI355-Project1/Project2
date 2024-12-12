import React, { useState } from "react";
import "../../styles/NotificationsToggle.css";

const NotificationsToggle = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="notifications-container">
      <button
        className={`notifications-toggle ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        Notifications {isOpen ? "▼" : "▶"}
      </button>
      {isOpen && (
        <div className="notifications-content">
          <p>No new notifications</p>
        </div>
      )}
    </div>
  );
};

export default NotificationsToggle;
