import React from "react";
import "./styles.css";
import { Button } from "../button";
import { useNavigate } from "react-router-dom";
export const Card = ({ data }) => {
  const navigation = useNavigate();
  const clickHandler = () => {
    console.log("clicked");
    navigation(data._id);
  };

  return (
    <div className="card-container">
      <img src={data.image} />
      <div className="details">
        <p>{data.title}</p>
        <p>{data.describtion}</p>
        <p>{data.location}</p>
        <Button onClick={clickHandler} title={data.title} />
      </div>
    </div>
  );
};
