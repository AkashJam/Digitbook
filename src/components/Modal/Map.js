import React, { useState, useEffect } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import ReactLeafletSearch from "react-leaflet-search";
import Select from "react-select";
import "./Modal.css";

const Maps = ({
  location,
  setLocation,
  toggleMap,
  handleChildElementClick,
}) => {
  
  const options = [
    { value: "supermarket", label: "Supermarket" },
    { value: "atm", label: "ATM" },
    { value: "pharmacy", label: "Pharmacy" },
    { value: "custom", label: "Custom" },
  ];
  
  let center = {
    lat: 51.505,
    lng: -0.09,
  };
  let loc = null;
  if (location === null) {
    loc = "";
  } else if (typeof location === "object") {
    loc = { value: "custom", label: "Custom" };
    center = location;
  } else if (typeof location === "string") {
    loc = options.filter((obj) => {
      return obj.value === location;
    });
    loc = loc[0];
  }

  const [position, setPosition] = useState(center);
  const [locType, setLocType] = useState(loc);

  useEffect(() => {
    if (locType && locType.value !== "custom" && locType.value !== location) {
      console.log(locType);
      setLocation(locType.value);
    }
    if (locType && locType.value === "custom" && position !== location) {
      console.log(position);
      setLocation(position);
    }
  }, [locType, position]);

  return (
    <div className="popup" onClick={toggleMap}>
      <div className="modal" onClick={(e) => handleChildElementClick(e)}>
        <Select
          defaultValue={locType}
          onChange={setLocType}
          options={options}
          className="dropdown"
        />
        {locType.value === "custom" && (
          <Map
            style={{ width: "60vw", height: "50vh", maxWidth: "588px", zIndex: "3" }}
            center={position}
            zoom={18}
            scrollWheelZoom={false}
            onClick={(e) => setPosition(e.latlng)}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                Latitude is {position.lat} <br /> Longitude is {position.lng}.
              </Popup>
            </Marker>
            <ReactLeafletSearch position="topleft" zoom={18}>
            {(info) => (
            <Marker position={info?.latLng} opacity={0}></Marker>
          )}
            </ReactLeafletSearch>
          </Map>
        )}
      </div>
    </div>
  );
};

export default Maps;
