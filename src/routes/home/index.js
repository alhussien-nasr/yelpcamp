import React, { useEffect, useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import { Card } from "../../components/card";

export const Home = () => {
  const [camps, setCamps] = useState([]);

  const getData = async () => {
    try {
      const res = await fetch("http://localhost:8080/campgrounds", {
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      console.log(res);
      setCamps(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="home-container">
      <Link to="new">
        <h1>add campground</h1>
      </Link>
      {camps.map((camp) => (
        <Card data={camp} />
      ))}
    </div>
  );
};
