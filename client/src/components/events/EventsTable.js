import React, { useState } from "react";
import EventCard from "./EventCard";
import "../../styles/EventsTable.css";

const EventsTable = ({ events }) => {
  const [selectedEventId, setSelectedEventId] = useState(null);

  return (
    <div className="events-table-container">
      {events.length === 0 ? (
        <p className="no-events">No events found</p>
      ) : (
        <table className="events-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Date</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr
                key={event.id}
                onClick={() => setSelectedEventId(event.id)}
                className="clickable-row"
              >
                <td>{event.title}</td>
                <td className="description-cell">{event.description}</td>
                <td>{new Date(event.date).toLocaleString()}</td>
                <td>{event.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedEventId && (
        <EventCard
          eventId={selectedEventId}
          onClose={() => setSelectedEventId(null)}
        />
      )}
    </div>
  );
};
export default EventsTable;
