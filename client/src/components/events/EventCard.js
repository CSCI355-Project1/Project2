import React, { useState, useEffect } from "react";
import "../../styles/EventCard.css";
// import calendarIcon from "../../assets/icons/calendar-icon.png";

const EventCard = ({ eventId, onClose }) => {
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3005/api/events/${eventId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch event details");
        }
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event details:", error);
        setError("Could not load event details");
      }
    };

    fetchEventDetails();
  }, [eventId]);

  if (error) return <div className="error-message">{error}</div>;
  if (!event) return <div className="loading">Loading...</div>;

  return (
    <div className="event-card-overlay" onClick={onClose}>
      <div className="event-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>

        <h3 className="event-card-title">{event.title}</h3>

        <div className="event-card-datetime">
          {/* <img src={calendarIcon} alt="Calendar" className="card-icon" /> */}
          <span>🗓️ {new Date(event.date).toLocaleString()}</span>
        </div>

        <div className="event-card-location">
          <span>📍 {event.location}</span>
        </div>

        <p className="event-card-description">{event.description}</p>

        <div className="event-card-footer">
          <span className="event-creator">Created by: {event.created_by}</span>
          <span className="event-created-at">
            Posted: {new Date(event.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
