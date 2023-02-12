import React, { useEffect, useLayoutEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./styles.css";
import { NoMatch } from "../../components/no-match/indes";
import { CampDetailsCard } from "../../components/camp-details-card";
import { CampReviewForm } from "../../components/camp-review-Form";
import { campTypes, reviewTypes } from "../../types";
import CampReviewCard from "../../components/camp-review-card";
import { LatLngExpression } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { apiSlice } from "../../store/api/apiSlice";

import {
  selectCampgrounds,
  useDeleteCampgroundMutation,
  useDeleteReviewMutation,
  useGetCampgroundByidQuery,
} from "../../store/campground/campgroundAPI";
import { resetUser } from "../../store/user/slice";
import { ErrorMassage } from "../../components/error-massage";

export const Camp = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { isError, data: camp } = useGetCampgroundByidQuery(id!);
  const [deleteReview, { isError: deleteError, isLoading, error }] =
    useDeleteReviewMutation();

  const deleteHandler = (reviewId: string) => async () => {
    deleteReview({ id, reviewId });
  };

  let content;
  if (deleteError && error && "status" in error) {
    if (error.status === 401) content = "you need to login ";
    dispatch(resetUser());
  }

  return camp?._id ? (
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
        {deleteError && <ErrorMassage>{content}</ErrorMassage>}
        <CampReviewForm />
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
