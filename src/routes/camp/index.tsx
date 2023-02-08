import React, { useEffect, useLayoutEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./styles.css";
import { NoMatch } from "../../components/no-match/indes";
import { CampDetailsCard } from "../../components/camp-details-card";
import { CampReviewForm } from "../../components/camp-review-Form";
import { getCampgroundByid } from "../../utils/helperFunctions";
import { campTypes, reviewTypes } from "../../types";
import CampReviewCard from "../../components/camp-review-card";
import { LatLngExpression } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export const Camp = () => {
  const [camp, setCamp] = useState({} as campTypes);
  const [position, setPosition] = useState<LatLngExpression>([51.505, -0.09]);

  console.log(camp);
  const location = useLocation();

  const { id } = useParams();

  const getdata = async () => {
    try {
      const data = await getCampgroundByid(id);
      setCamp(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    console.log("fired");
    getdata();
  }, [location.pathname]);

  const deleteHandler = (reviewId: string) => async () => {
    await fetch(
      `https://yelpcamp-api.onrender.com/campgrounds/${id}/reviews/${reviewId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    ).then((res) => res.json());
    getdata();
  };

  return camp._id ? (
    <div className="camp-container">
      <CampDetailsCard camp={camp} />

      <div className="camp-review-container">
        <MapContainer
          center={camp.geometry}
          zoom={2}
          style={{
            width: "100%",
            height: "200px",
            zIndex: 1,
          }}
          zoomControl={false}
          maxZoom={13}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
          />
          <Marker position={camp.geometry}>
            <Popup>
              {camp.title}
              <br /> {camp.location}
            </Popup>
          </Marker>
        </MapContainer>
        <CampReviewForm setCamp={setCamp} />
        {camp?.reviews?.map((item: reviewTypes) => (
          <CampReviewCard
            key={item._id}
            item={item}
            onClick={deleteHandler(item._id)}
          />
        ))}
      </div>
    </div>
  ) : (
    <NoMatch />
  );
};
