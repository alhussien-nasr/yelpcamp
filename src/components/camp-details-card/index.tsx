import React from "react";
import "./styles.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "../button";
import { campTypes, imageType } from "../../types";
import { useAppSelector } from "../../store/hooks";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

type propsTypes = { camp: campTypes };

export const CampDetailsCard = ({ camp }: propsTypes) => {
  const navigation = useNavigate();
  const { id } = useParams();
  const user = useAppSelector((store) => store.user.user);
  const deleteHandler = async () => {
    try {
      await fetch(`https://yelpcamp-api.onrender.com/campgrounds/${id}`, {
        method: "delete",
        credentials: "include",
      });
      navigation("/");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(camp.author._id, user?._id, "camp");
  console.log(camp);
  return (
    <div className="camp-details-container">
      <Carousel
        axis="horizontal"
        dynamicHeight={true}
        showArrows={true}
        showThumbs={false}
      >
        {camp.images.map((image: imageType) => {
          return (
            <div>
              <img src={image.url} />
            </div>
          );
        })}
      </Carousel>
      <h4>{camp.title}</h4>
      <p> {camp.author.username}</p>
      <p> {camp.describtion}</p>
      <p>{camp.location}</p>
      <p>${camp.price}/night</p>
      {camp.author._id == user?._id && (
        <span>
          <Link to="edit">
            <Button type="button" title="edit" color="rgb(0, 165, 162)" />
          </Link>
          <Button
            type="button"
            title="delete"
            color="rgb(226, 110, 110)"
            onClick={deleteHandler}
          />
        </span>
      )}
    </div>
  );
};
