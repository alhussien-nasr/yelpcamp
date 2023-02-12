import React, { useEffect, useState } from "react";
import "./styles.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Card } from "../../components/card";
import ClipLoader from "react-spinners/ClipLoader";
import { ErrorMassage } from "../../components/error-massage";
import {
  selectCampgrounds,
  useGetCampgroundsQuery,
} from "../../store/campground/campgroundAPI";

export const Campgrounds = () => {

  const { error, isLoading, isError } = useGetCampgroundsQuery();
  const camps = useAppSelector((s) => selectCampgrounds(s));
  console.log(camps, "camps");
  console.log(isLoading, "isloading");
  console.log(error, "error");
  let content;
  if (error && "error" in error) {
    content = error.error;
  }
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

        {!isLoading &&
          camps?.map((camp: any) => {
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
      {isError && <ErrorMassage btn={false}>{content}</ErrorMassage>}
      {isLoading ? (
        <ClipLoader />
      ) : (
        camps?.map((camp: any) => <Card data={camp} />)
      )}
    </div>
  );
};
