import React from "react";
import "./Events.css";
import EventCard from "../components/events/EventCard";
import eventDefault from "../pages/eventDefault.jpg"

const Events = () => {
  const eventData = [
    {
      id: 1,
      title: "Tech Conference 2024",
      date: "January 15, 2024",
      location: "San Francisco, CA",
      description: "Join us for an exciting conference about emerging technologies.",
      imageURL: eventDefault,
    },
    {
      id: 2,
      title: "Music Festival",
      date: "March 10, 2024",
      location: "Austin, TX",
      description: "Experience live performances from top artists worldwide.",
      imageURL: eventDefault,
    },
    {
      id: 3,
      title: "Art Workshop",
      date: "February 20, 2024",
      location: "New York, NY",
      description: "Learn to paint with professional artists.",
      imageURL: eventDefault,
    },
    {
      id: 4,
      title: "Black Friday Sale",
      date: "November 29, 2024",
      location: "New York, NY",
      description: "Come by and shop for deals!",
      imageURL: eventDefault,
    },
    {
      id: 5,
      title: "Tech Conference 2024",
      date: "January 15, 2024",
      location: "San Francisco, CA",
      description: "Join us for an exciting conference about emerging technologies.",
      imageURL: eventDefault,
    },
    {
      id: 6,
      title: "Music Festival",
      date: "March 10, 2024",
      location: "Austin, TX",
      description: "Experience live performances from top artists worldwide.",
      imageURL: eventDefault,
    },
    {
      id: 7,
      title: "Art Workshop",
      date: "February 20, 2024",
      location: "New York, NY",
      description: "Learn to paint with professional artists.",
      imageURL: eventDefault,
    },
    {
      id: 8,
      title: "Black Friday Sale",
      date: "November 29, 2024",
      location: "New York, NY",
      description: "Come by and shop for deals!",
      imageURL: eventDefault,
    },
    {
      id: 9,
      title: "Tech Conference 2024",
      date: "January 15, 2024",
      location: "San Francisco, CA",
      description: "Join us for an exciting conference about emerging technologies.",
      imageURL: eventDefault,
    },
    {
      id: 10,
      title: "Music Festival",
      date: "March 10, 2024",
      location: "Austin, TX",
      description: "Experience live performances from top artists worldwide.",
      imageURL: eventDefault,
    },
    {
      id: 11,
      title: "Art Workshop",
      date: "February 20, 2024",
      location: "New York, NY",
      description: "Learn to paint with professional artists.",
      imageURL: eventDefault,
    },
    {
      id: 12,
      title: "Black Friday Sale",
      date: "November 29, 2024",
      location: "New York, NY",
      description: "Come by and shop for deals!",
      imageURL: eventDefault,
    },
  ];

  return (
    <div className="events-container">
      <h1>Events</h1>
      <div className="event-cards-grid">
        {eventData.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Events;
