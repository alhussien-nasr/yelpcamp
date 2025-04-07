import React, { useEffect, useState } from "react";
import "./styles.css";
import { AddCampForm } from "../../components/add-camp-form";


export const NewCamp = () => {


  return (
    <div className="new-camp-container">
      <h1>New campgrounds</h1>
      <div className="row-container">
        <AddCampForm />
      </div>
    </div>
  );
};
