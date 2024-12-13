import React, { useState, useEffect } from "react";
import "../../styles/NotificationsToggle.css";

const NotificationsToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem("token");

  const fetchNotifications = async () => {
    try {
      const response = await fetch("http://localhost:3005/api/notifications", {
        headers: {
          Authorization: token,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    if (isOpen && token) {
      fetchNotifications();
    }
  }, [isOpen]);

  const handleDismiss = async (eventId) => {
    try {
      const response = await fetch(
        `http://localhost:3005/api/notifications/dismiss/${eventId}`,
        {
          method: "POST",
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.ok) {
        setNotifications(notifications.filter((n) => n.event_id !== eventId));
      }
    } catch (error) {
      console.error("Error dismissing notification:", error);
    }
  };

  return (
    <div className="notifications-container">
      <button
        className={`notifications-toggle ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        Notifications {isOpen ? "▼" : "▶"}
        {notifications.length > 0 && (
          <span className="notification-badge">{notifications.length}</span>
        )}
      </button>
      {isOpen && (
        <div className="notifications-content">
          {notifications.length === 0 ? (
            <p className="no-notifications">No new notifications</p>
          ) : (
            notifications.map((notification) => (
              <div key={notification.id} className="notification-row">
                <div className="notification-info">
                  <span className="notification-title">
                    {notification.event_title}
                  </span>
                  <span className="notification-date">
                    {new Date(notification.event_date).toLocaleDateString()}
                  </span>
                </div>
                <button
                  className="dismiss-button"
                  onClick={() => handleDismiss(notification.event_id)}
                  title="Mark as read"
                >
                  ✓
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationsToggle;
