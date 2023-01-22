import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./styles.css";
import { Button } from "../../components/button";
export const Camp = () => {
  const [camp, setCamp] = useState({});
  const { id } = useParams();
  const navigation = useNavigate();
  console.log(id);
  const getdata = async () => {
    try {
      const data = await fetch(`http://localhost:8080/campgrounds/${id}`).then(
        (res) => res.json()
      );
      setCamp(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const deleteHandler = async () => {
    try {
      await fetch(`http://localhost:8080/campgrounds/${id}`, {
        method: "delete",
      });
      navigation("/");
    } catch (error) {
      console.log(error);
    }
  };
  const editHandler = () => {};
  return (
    <div className="camp-container">
      <img src={camp.image} />
      <h4>{camp.title}</h4>
      <p> {camp.describtion}</p>
      <p>{camp.location}</p>
      <p>${camp.price}/night</p>
      <div className="row">
        <Link to="edit">
          <Button type="button" title="edit" color="rgb(0, 165, 162)" />
        </Link>
        <Button
          type="button"
          title="delete"
          color="rgb(226, 110, 110)"
          onClick={deleteHandler}
        />
      </div>
    </div>
  );
};
