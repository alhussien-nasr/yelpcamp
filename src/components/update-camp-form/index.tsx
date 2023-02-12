import React, { ChangeEvent, FormEvent, useState } from "react";
import { FormInput } from "../form-input";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../button";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { authorTypes, imageType } from "../../types";
import ClipLoader from "react-spinners/ClipLoader";

import "./styles.css";
import {
  useGetCampgroundByidQuery,
  useUpdateCampgroundMutation,
} from "../../store/campground/campgroundAPI";
import { resetUser } from "../../store/user/slice";
import { ErrorMassage } from "../error-massage";
type initalStateTypes = {
  title: string;
  describtion: string;
  price: number;
  location: string;
  _id: string;
  author: authorTypes;
  images: imageType[];
};

const initalState = {
  title: "",
  describtion: "",
  price: 0,
  location: "",
} as initalStateTypes;

export const UpdateCampForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useGetCampgroundByidQuery(id!);
  const [camp, setCamp] = useState(data);
  const [images, setImages] = useState<any>([]);
  const [imageToDelete, setImageToDelete] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  const user = useAppSelector((store) => store.user.user);
  const [UpdateCamp, { isError, error, isSuccess, isLoading }] =
    useUpdateCampgroundMutation();
  console.log(isError, error);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCamp({ ...camp, [name]: value });
  };
  console.log(camp);
  const deleteImageHandler = (image: string) => {
    return () => setImageToDelete([...imageToDelete, image]);
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify({ ...camp, imageToDelete }));
      Object.keys(images).forEach((key) => {
        formData.append("images", images[key]);
      });
      console.log(formData, "form");
      await UpdateCamp({ body: formData, id });
    } catch (error) {
      console.log(error);
    }
  };

  isSuccess && navigate(`/Campgrounds/${id}`);
  let content;
  if (isError && error && "status" in error) {
    if (error.status === 401)
      content = "you need to login to create campground";
    dispatch(resetUser());
  }

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
        title={"Add Image"}
        type="file"
        name="images"
        multiple
        required={false}
        onChange={(e) => {
          if (e.currentTarget.files) {
            setImages(e.currentTarget.files);
          }
        }}
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
      <h5>Delete Image</h5>
      <div className="thumbnail-container">
        {camp.images.map((img: any) => (
          <div className="thumbnail">
            <input type="checkbox" onClick={deleteImageHandler(img.filename)} />
            <img
              src={img.url.replace("/upload", "/upload/c_scale,h_100,w_150")}
              // onError={({ currentTarget }) => {
              //   currentTarget.onerror
              //   currentTarget.src = img.url;
              // }}
            />
          </div>
        ))}
      </div>
      {isError && <ErrorMassage>{content}</ErrorMassage>}
      <Button title="update Campground" disabled={isLoading} color="green">
        {isLoading && <ClipLoader />}
      </Button>
    </form>
  );
};
