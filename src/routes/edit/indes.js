import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UpdateCampForm } from "../../components/update-camp-form";
import './styles.css'
const initalState = { title: "", describtion: "" };

const Edit = () => {
  const [camp, setCamp] = useState(initalState);

  return (
    <div className="edit-container">
      <UpdateCampForm />
    </div>
  );
};

export default Edit;
