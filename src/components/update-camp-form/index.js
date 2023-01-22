import React, { useEffect, useState } from "react";
import { FormInput } from "../form-input";
import { Form, Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "../button";
const initalState = {
  title: "",
  describtion: "",
  image: "",
  price: 0,
  location: "",
};

export const UpdateCampForm = () => {
  const [camp, setCamp] = useState(initalState);
  const { id } = useParams();

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
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCamp({ ...camp, [name]: value });
  };

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await fetch(`http://localhost:8080/campgrounds/${id}`, {
        method: "PUT",
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
      <FormInput
        title={"Title"}
        name="title"
        value={camp.title}
        onChange={handleChange}
      />
      <FormInput
        title={"Location"}
        name="location"
        value={camp.location}
        onChange={handleChange}
      />
      <FormInput
        title={"Image Url"}
        name="image"
        value={camp.image}
        onChange={handleChange}
      />
      <FormInput
        title={"Campground Price"}
        name="price"
        icon
        onChange={handleChange}
        value={camp.price}
      />
      <FormInput
        value={camp.describtion}
        title={"Description"}
        name="describtion"
        describtion
        onChange={handleChange}
      />
      <Button title="update Campground" color='green' />
    </form>
  );
};
