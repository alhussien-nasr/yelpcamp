import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./styles.css";
import { AddCampForm } from "../../components/add-camp-form";
const initalState = { title: "", describtion: "" };
export const NewCamp = () => {
  const [camp, setCamp] = useState(initalState);
  console.log(camp);

  return (
    <div className="new-camp-container">
      <h1>New campgrounds</h1>
      <AddCampForm />
      <Link to="/">home</Link>
    </div>
  );
};
