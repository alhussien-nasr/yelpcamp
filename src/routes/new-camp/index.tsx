import React, { useEffect, useState } from "react";
import "./styles.css";
import { AddCampForm } from "../../components/add-camp-form";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   useMapEvents,
// } from "react-leaflet";
// import { LatLngExpression } from "leaflet";

export const NewCamp = () => {
  // const [position, setPosition] = useState<LatLngExpression>([51.505, -0.09]);
  // const MapEvents = () => {
  //   useMapEvents({
  //     click(e) {
  //       // setState your coords here
  //       // coords exist in "e.latlng.lat" and "e.latlng.lng"
  //       console.log(e.latlng.lat);
  //       console.log(e.latlng.lng);
  //       console.log(position);
  //       setPosition([e.latlng.lat, e.latlng.lng]);
  //     },
  //   });
  //   return <></>;
  // };

  // search

  return (
    <div className="new-camp-container">
      <h1>New campgrounds</h1>
      <div className="row-container">
        <AddCampForm />
        {/* <MapContainer
          center={position}
          zoom={6}
          style={{ minWidth: "500px", height: "500px" }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          <MapEvents />
        </MapContainer> */}
      </div>
    </div>
  );
};
