import React, { useState, useEffect } from "react";
import EventsBanner from "../components/events/EventsBanner";
import NotificationsToggle from "../components/events/NotificationsToggle";
import EventsTable from "../components/events/EventsTable";
import NewEventForm from "../components/events/NewEventForm";
import "../styles/Events.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [showNewEventForm, setShowNewEventForm] = useState(false);
  const token = localStorage.getItem("token");

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:3005/api/events");
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      setEvents(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("Error loading events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEventCreated = async (newEvent) => {
    await fetchEvents();
  };

  return (
    <div className="events-container">
      <EventsBanner />
      <div className="events-content">
        <div className="events-header">
          <NotificationsToggle />
        </div>
        <div
          className="new-events"
          style={{ marginTop: "30px", marginBottom: "30px" }}
        >
          {token && (
            <button
              className="new-event-button"
              onClick={() => setShowNewEventForm(true)}
            >
              New Event
            </button>
          )}
        </div>

        {error ? (
          <div className="error-message">{error}</div>
        ) : (
          <EventsTable events={events} />
        )}

        {showNewEventForm && (
          <NewEventForm
            onClose={() => setShowNewEventForm(false)}
            onEventCreated={handleEventCreated}
          />
        )}
      </div>
    </div>
  );
};

export default Events;
