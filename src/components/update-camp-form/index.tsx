import React, {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import { FormInput } from "../form-input";
import { Form, Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "../button";
import { editCampground, getCampgroundByid } from "../../utils/helperFunctions";
import { useAppSelector } from "../../store/hooks";
import { authorTypes, imageType } from "../../types";
import { NoMatch } from "../no-match/indes";
import ClipLoader from "react-spinners/ClipLoader";

import "./styles.css";
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

  const [camp, setCamp] = useState(initalState);

  const [images, setImages] = useState<any>([]);
  const [imageToDelete, setImageToDelete] = useState<string[]>([]);
  const [loading, setloading] = useState(false);

  const user = useAppSelector((store) => store.user.user);

  const getdata = async () => {
    const data = await getCampgroundByid(id);
    setCamp(data);
  };

  useEffect(() => {
    getdata();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCamp({ ...camp, [name]: value });
  };

  const deleteImageHandler = (image: string) => {
    return () => setImageToDelete([...imageToDelete, image]);
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setloading(true);
      await editCampground({ ...camp, imageToDelete }, images);
      navigate(`/Campgrounds/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return camp.author?._id == user?._id ? (
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
        {camp.images.map((img) => (
          <div className="thumbnail">
            <input type="checkbox" onClick={deleteImageHandler(img.filename)} />
            <img
              src={img.url.replace("/upload", "/upload/c_scale,h_100,w_150")}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = img.url;
              
              }}
            />
          </div>
        ))}
      </div>
      <Button title="update Campground" disabled={loading} color="green">
        {loading && <ClipLoader />}
      </Button>
    </form>
  ) : (
    <NoMatch />
  );
};
