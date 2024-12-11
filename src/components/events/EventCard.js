import React from "react";
import "./EventCard.css";

const EventCard = ({ event }) => {
  const { title, date, location, description } = event;

  return (
    <div className="event-card">
      <h2>{title}</h2>
      <p><strong>Date:</strong> {date}</p>
      <p><strong>Location:</strong> {location}</p>
      <p>{description}</p>
    </div>
  );
};

export default EventCard;
