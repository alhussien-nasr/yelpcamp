import React, { useEffect, useState } from "react";
import "./styles.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchCamps } from "../../store/campground/slice";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Card } from "../../components/card";

export const Campgrounds = () => {
  const camps = useAppSelector((state) => state.campgrounds.campgrounds);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCamps());
  }, []);

  return (
    <div className="campgrounds-container">
      <MapContainer
        center={[40.3916172, -111.8507662]}
        zoom={2}
        style={{
          width: "100%",
          height: "300px",
          zIndex: 1,
          marginTop: 50,
          marginBottom: 30,
        }}
        maxZoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />

        {camps?.map((camp) => {
          return (
            camp.geometry.length && (
              <Marker position={camp.geometry}>
                <Popup>
                  {camp.title}
                  <br /> {camp.location}
                </Popup>
              </Marker>
            )
          );
        })}
      </MapContainer>
      {camps?.map((camp) => (
        <Card data={camp} />
      ))}
    </div>
  );
};
