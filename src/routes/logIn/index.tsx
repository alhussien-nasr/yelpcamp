import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Button } from "../../components/button";
import { FormInput } from "../../components/form-input";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles.css";
import { addUser } from "../../store/user/slice";
import { useAppDispatch } from "../../store/hooks";
import { useLogInUserMutation } from "../../store/user/userAPI";
import ClipLoader from "react-spinners/ClipLoader";
import { ErrorMassage } from "../../components/error-massage";

const initalState = {
  password: "",
  username: "",
};

export const LogIn = () => {
  const { state } = useLocation();
  const formRef = useRef<HTMLFormElement>(null);
  const [loginUser, { isError, error, isLoading, isSuccess, data }] =
    useLogInUserMutation();
  const [user, setUser] = useState(initalState);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  console.log(isError, error, isLoading, isSuccess, data);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current?.checkValidity()) {
      e.stopPropagation();
      formRef.current?.classList.add("was-validated");
    } else {
      try {
        const data = await loginUser(user);
      } catch (error) {
        console.log(error);
      }
    }
  };
  if (isSuccess ) {
    dispatch(addUser(data));
    console.log("s");
    state.from == "/signup" ? navigate(-2) : navigate(-1);
  }
  let content = "";

  if (isError && error && "originalStatus" in error) {
    console.log("erererer");
    if (error.originalStatus == 401) {
      content = "password or user is wrong";
    }
  }

  return (
    <div className="log-in-container">
      <section>
        <img src={require("../../assets/tent.avif")} />
        <form
          onSubmit={submitHandler}
          ref={formRef}
          noValidate
          className="log-in-form"
        >
          <h4>login</h4>

          <FormInput title={"name"} name="username" onChange={handleChange} />
          <FormInput
            title={"password"}
            name="password"
            onChange={handleChange}
          />
          {isError && <ErrorMassage btn={false}>{content}</ErrorMassage>}
          <Button title="log in" color="green">
            {isLoading && <ClipLoader />}
          </Button>
        </form>
      </section>
    </div>
  );
};
