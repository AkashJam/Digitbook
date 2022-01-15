import React, { useState, useRef, useMemo, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = ({ position, setPosition, toggleMap, handleChildElementClick }) => {
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    [setPosition]
  );

  const [location, setLocation] = useState("");

  useEffect(() => {
    console.log(typeof position === "object");
  }, [position]);

  function handleLocationChange(e) {
    setLocation(e.target.value);
  }

  return (
    <div className="popup" onClick={toggleMap}>
      <div className="modal" onClick={(e) => handleChildElementClick(e)}>
        <fieldset value={location} onChange={(e) => handleLocationChange(e)}>
          <label>
            <input type="radio" name="location" value="supermarket" />
            supermarket
          </label>
          <label>
            <input type="radio" name="location" value="pharmacy" />
            pharmacy
          </label>
          <label>
            <input type="radio" name="location" value="atm" />
            atm
          </label>
          <label>
            <input type="radio" name="location" value="custom" />
            custom
          </label>
        </fieldset>
        {location === "custom" && (
          <MapContainer
            style={{ width: "70vh", height: "50vh" }}
            center={position}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              draggable={true}
              eventHandlers={eventHandlers}
              position={position}
              ref={markerRef}
            >
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        )}
      </div>
    </div>
  );
};

export default Map;
