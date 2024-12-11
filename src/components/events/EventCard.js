import React, { useState } from "react";
import "./EventCard.css";
import MapModal from "./MapModal";

const EventCard = ({ event }) => {
  const { title, date, location, description, imageURL, latitude, longitude } = event;
  const [rsvpStatus, setRsvpStatus] = useState("Undecided");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRsvp = (status) => {
    setRsvpStatus(status);
    // Backend here
  }

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
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
        <p>Your Status: {rsvpStatus}</p>
        <div>
          <button onClick={() => handleRsvp("yes")} className="rsvp-yes">Yes</button>
          <button onClick={() => handleRsvp("no")} className="rsvp-no">No</button>
          <button onClick={() => handleRsvp("maybe")} className="rsvp-maybe">Maybe</button>
        </div>
      </div>

      <button onClick={openModal} className="open-modal-btn">Show more detail</button>

      {isModalOpen && (
        <MapModal
          latitude={latitude}
          longitude={longitude}
          date={date}
          location={location}
          description={description}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default EventCard;