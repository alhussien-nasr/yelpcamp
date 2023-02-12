import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { FormInput } from "../form-input";
import { useNavigate } from "react-router-dom";
import { Button } from "../button";
import { useAppDispatch } from "../../store/hooks";
import { addUser, resetUser } from "../../store/user/slice";
import "./styles.css";
import { ErrorMassage } from "../error-massage";
import ClipLoader from "react-spinners/ClipLoader";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { usePostCampgroundsMutation } from "../../store/campground/campgroundAPI";

const initalState = {
  title: "",
  describtion: "",
  price: 0,
  location: "",
};

export const AddCampForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [camp, setCamp] = useState<any>(initalState);
  const [errorMassage, setErrorMassage] = useState<any>(null);
  const [image, setImage] = useState<any>([]);
  const [loading, setloading] = useState(false);

  const [postCampground, stat] = usePostCampgroundsMutation();
  const { data, isError, isLoading, error, isSuccess } = stat;
  console.log(isLoading, "isloading");
  console.log(data, "data");
  console.log(error, "error");
  const dispatch = useAppDispatch();
  function isErrorWithMessage(
    error: unknown
  ): error is { data: { massage: string } } {
    return (
      typeof error === "object" &&
      error != null &&
      "data" in error &&
      error.data != null &&
      typeof error.data === "object" &&
      "massage" in error.data &&
      typeof error.data.massage === "string"
    );
  }
  console.log(camp);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCamp({ ...camp, [name]: value });
  };
  const provider = new OpenStreetMapProvider();

  const navigate = useNavigate();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current?.checkValidity()) {
      e.stopPropagation();
      formRef.current?.classList.add("was-validated");
    } else {
      try {
        const results = await provider.search({ query: camp.location });
        console.log(results, "ress");
        if (!results.length) {
          setErrorMassage("no location found");
          throw "no location found";
        } else {
          const { x, y } = results[0];
          const formData = new FormData();
          formData.append(
            "data",
            JSON.stringify({ ...camp, geometry: [x, y] })
          );
          Object.keys(image).forEach((key) => {
            formData.append("images", image[key]);
          });

          await postCampground(formData);
        }
      } catch (error) {
        console.log(error, "from catch");
        setErrorMassage("error");
      }
    }
  };
  isSuccess && navigate(`/campgrounds/${data._id}`);
  let content: string = "";
  if (isError && error && "status" in error) {
    if (error.status === 401)
      content = "you need to login to create campground";
         dispatch(resetUser());
  }

  return (
    <form
      onSubmit={submitHandler}
      ref={formRef}
      noValidate
      className="add-camp-form-container"
    >
      {isError && (
        <ErrorMassage
          onClick={() => {
            setErrorMassage(null);
          }}
        >
          {content}
        </ErrorMassage>
      )}
      <FormInput title={"Title"} name="title" onChange={handleChange} />
      {errorMassage && (
        <ErrorMassage
          onClick={() => {
            setErrorMassage(null);
          }}
        >
          {errorMassage}
        </ErrorMassage>
      )}

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
