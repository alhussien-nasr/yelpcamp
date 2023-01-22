import React, { useState } from "react";
import { FormInput } from "../form-input";
import { Form, Link, useNavigate } from "react-router-dom";
import { Button } from "../button";
const initalState = {
  title: "",
  describtion: "",
  image: "",
  price: 0,
  location: "",
};

export const AddCampForm = () => {
  const [camp, setCamp] = useState(initalState);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCamp({ ...camp, [name]: value });
  };

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await fetch("http://localhost:8080/campgrounds/", {
        method: "POST",
        body: JSON.stringify(camp),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      navigate(`/${data._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <FormInput title={"Title"} name="title" onChange={handleChange} />
      <FormInput title={"Location"} name="location" onChange={handleChange} />
      <FormInput title={"Image Url"} name="image" onChange={handleChange} />
      <FormInput
        title={"Campground Price"}
        name="price"
        icon
        onChange={handleChange}
      />
      <FormInput
        title={"Description"}
        name="describtion"
        describtion
        onChange={handleChange}
      />
      <Button title="Add Campground" color="green" />
    </form>
  );
};
