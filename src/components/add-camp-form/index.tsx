import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { FormInput } from "../form-input";
import { useNavigate } from "react-router-dom";
import { Button } from "../button";
import { useAppDispatch } from "../../store/hooks";
import { addUser } from "../../store/user/slice";
import "./styles.css";
import { ErrorMassage } from "../error-massage";
import { postCampgrounds } from "../../utils/helperFunctions";
import ClipLoader from "react-spinners/ClipLoader";
import { OpenStreetMapProvider } from "leaflet-geosearch";

const initalState = {
  title: "",
  describtion: "",
  price: 0,
  location: "",
};

export const AddCampForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [camp, setCamp] = useState<any>(initalState);
  const [errorMassage, setErrorMassage] = useState<null | string>(null);
  const [image, setImage] = useState<any>([]);
  const [loading, setloading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCamp({ ...camp, [name]: value });
  };

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const locationHandler = async (val: string) => {
    console.log("working");
    try {
      // const results = await provider.search({ query: val });
      // console.log(results, "ress");
      // if (!results) {
      //   setErrorMassage("no location found");
      //   throw "no location found";
      // }
      // const { x, y } = results[0];
      // setCamp({ ...camp, geometry: [x, y] });
    } catch (error) {
      throw error;
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current?.checkValidity()) {
      e.stopPropagation();
      formRef.current?.classList.add("was-validated");
    } else {
      try {
        setloading(true);
        const results = await provider.search({ query: camp.location });
        console.log(results, "ress");
        if (!results) {
          setErrorMassage("no location found");
          throw "no location found";
        }
        const { x, y } = results[0];
        const res = await postCampgrounds({ ...camp, geometry: [x, y] }, image);
        if (res) {
          const data = await res.json();
          console.log(data);
          if (res.status == 401) {
            setErrorMassage(data.error);
            dispatch(addUser(null));
          } else {
            navigate(`/campgrounds/${data._id}`);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const provider = new OpenStreetMapProvider();

  console.log(camp, image);
  return (
    <form
      onSubmit={submitHandler}
      ref={formRef}
      noValidate
      className="add-camp-form-container"
    >
      {errorMassage && (
        <ErrorMassage
          massage={errorMassage}
          onClick={() => {
            setErrorMassage(null);
          }}
        />
      )}
      <FormInput title={"Title"} name="title" onChange={handleChange} />
      <FormInput title={"Location"} name="location" onChange={handleChange} />
      <FormInput
        title={"Add Image"}
        type="file"
        name="image"
        multiple
        required={false}
        onChange={(e) => {
          if (e.currentTarget.files) {
            setImage(e.currentTarget.files);
          }
        }}
      />
      <FormInput
        title={"Campground Price"}
        name="price"
        type="number"
        icon
        onChange={handleChange}
      />
      <textarea
        className="form-control"
        required
        id={"Description"}
        name={"describtion"}
        onChange={handleChange}
      />
      <Button
        title="Add Campground"
        color="green"
        disabled={loading}
        type="submit"
      >
        {loading && <ClipLoader />}
      </Button>
    </form>
  );
};
