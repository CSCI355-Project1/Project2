import React, { useState, useEffect } from "react";
import "../../styles/EventCard.css";
import LocationMap from "./LocationMap";

const EventCard = ({ eventId, onClose }) => {
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const [enrollmentStatus, setEnrollmentStatus] = useState("");
  const token = localStorage.getItem("token");

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

  const handleEnrollClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:3005/api/notifications/enroll/${eventId}`,
        {
          method: "POST",
          headers: {
            Authorization: token,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setEnrollmentStatus("Successfully enrolled in notifications!");
      } else {
        setEnrollmentStatus(data.error || "Failed to enroll in notifications");
      }
    } catch (error) {
      console.error("Error enrolling in notifications:", error);
      setEnrollmentStatus("Error enrolling in notifications");
    }
  };

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
          <span>🗓️ {new Date(event.date).toLocaleString()}</span>
        </div>

        <div className="event-card-location">
          <span>📍 {event.location}</span>
        </div>

        {event.location && (
          <div className="event-map-container">
            <LocationMap location={event.location} />
          </div>
        )}

        <p className="event-card-description">{event.description}</p>

        {token && (
          <div className="event-card-actions">
            <button className="enroll-button" onClick={handleEnrollClick}>
              Enroll in Notifications
            </button>
            {enrollmentStatus && (
              <p
                className={`enrollment-status ${
                  enrollmentStatus.includes("Successfully")
                    ? "success"
                    : "error"
                }`}
              >
                {enrollmentStatus}
              </p>
            )}
          </div>
        )}

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
