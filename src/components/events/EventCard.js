import React, { useState } from "react";
import "./EventCard.css";

const EventCard = ({ event }) => {
  const { title, date, location, description, imageURL } = event;
  const [rsvpStatus, setRsvpStatus] = useState(null);

  const handleRsvp = (status) => {
    setRsvpStatus(status);
    // Backend here
  }

  return (
    <div className="event-card">
      <h2>{title}</h2>
      {imageURL && <img src={imageURL} alt={title} className="event-card-image" />}
      <p><strong>Date:</strong> {date}</p>
      <p><strong>Location:</strong> {location}</p>
      <p>{description}</p>

      <div className="rsvp-section">
        <h3>RSVP</h3>
        <div>
          <button onClick={() => handleRsvp("yes")} className="rsvp-yes">Yes</button>
          <button onClick={() => handleRsvp("no")} className="rsvp-no">No</button>
          <button onClick={() => handleRsvp("maybe")} className="rsvp-maybe">Maybe</button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
