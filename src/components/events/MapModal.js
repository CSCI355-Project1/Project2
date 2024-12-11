import React from "react";
import "./MapModal.css";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

const MapModal = ({ latitude, longitude, date, location, description, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Event Location</h3>

                <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                    <div>
                        <Map
                            style={{ width: "100%", height: "200px" }}
                            defaultZoom={12}
                            defaultCenter={{ lat: latitude, lng: longitude }}
                            disableDefaultUI={true}
                            gestureHandling="cooperative"
                        >
                            <Marker position={{ lat: latitude, lng: longitude }} />
                        </Map>
                    </div>
                </APIProvider>

                <p><strong>Event Date:</strong> {date}</p>
                <p><strong>Location:</strong> {location}</p>
                <p>{description}</p>
                <button onClick={onClose} className="close-modal-btn">Close</button>
            </div>
        </div>
    )
}

export default MapModal