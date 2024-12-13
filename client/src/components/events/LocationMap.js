// src/components/LocationMap/LocationMap.jsx
import React, { useState, useEffect } from "react";
import "../../styles/LocationMap.css";

const LocationMap = ({ location }) => {
  const mapRef = React.useRef(null);
  const [mapError, setMapError] = useState(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    if (window.google?.maps) {
      setIsScriptLoaded(true);
      return;
    }

    if (document.querySelector('script[src*="maps.googleapis.com/maps/api"]')) {
      return;
    }

    const loadGoogleMapsScript = () => {
      const googleMapScript = document.createElement("script");
      googleMapScript.src = `https://maps.googleapis.com/maps/api/js?v=beta&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places,marker`;
      googleMapScript.async = true;
      googleMapScript.defer = true;

      googleMapScript.addEventListener("load", () => {
        setIsScriptLoaded(true);
      });

      document.head.appendChild(googleMapScript);
    };

    loadGoogleMapsScript();
  }, []);

  useEffect(() => {
    if (!isScriptLoaded || !location) return;

    const initializeMap = async () => {
      try {
        console.log("Initializing map with location:", location);
        const { Map } = await window.google.maps.importLibrary("maps");
        const { AdvancedMarkerElement } =
          await window.google.maps.importLibrary("marker");

        const geocoder = new window.google.maps.Geocoder();

        geocoder.geocode({ address: location }, async (results, status) => {
          console.log("Geocoding results:", results, "status:", status);

          if (status === "OK" && mapRef.current) {
            const mapOptions = {
              center: results[0].geometry.location,
              zoom: 15,
              mapId: "d58631d3cfece7bf",
            };

            console.log("Creating map with options:", mapOptions);
            const map = new Map(mapRef.current, mapOptions);

            new AdvancedMarkerElement({
              map,
              position: results[0].geometry.location,
            });
          } else {
            setMapError(`Could not load location on map. Status: ${status}`);
          }
        });
      } catch (error) {
        console.error("Map initialization error:", error);
        setMapError(`Error loading map: ${error.message}`);
      }
    };

    initializeMap();
  }, [isScriptLoaded, location]);

  if (mapError) return <div className="map-error">{mapError}</div>;

  return <div ref={mapRef} className="location-map" />;
};

export default LocationMap;
