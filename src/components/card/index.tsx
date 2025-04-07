import React from "react";
import "./styles.css";
import { Button } from "../button";
import { useNavigate } from "react-router-dom";
import { campTypes } from "../../types";

type propsTypes = {
  data: campTypes;
};
export const Card = ({ data }: propsTypes) => {
  const navigation = useNavigate();
  const clickHandler = () => {
    console.log("clicked");
    navigation(data._id);
  };

  return (
    <div className="card-container">
      {data.images.length ? <img src={data.images[0].url} /> : null}
      <div className="details">
        <p>{data.title}</p>
        <p>{data.describtion}</p>
        <p>{data.location}</p>
        <Button onClick={clickHandler} title={`View ${data.title}`} />
      </div>
    </div>
  );
};
