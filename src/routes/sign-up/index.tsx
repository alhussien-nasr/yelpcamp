import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Button } from "../../components/button";
import { FormInput } from "../../components/form-input";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles.css";
import { addUser } from "../../store/user/slice";
import { useAppDispatch } from "../../store/hooks";
import { useRegisterUserMutation } from "../../store/user/userAPI";
import ClipLoader from "react-spinners/ClipLoader";
import { ErrorMassage } from "../../components/error-massage";

const initalState = {
  email: "",
  password: "",
  username: "",
};

export const SignUp = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [user, setUser] = useState(initalState);
  const [registerUser, { isError, isLoading, isSuccess, error, data }] =
    useRegisterUserMutation();
  console.log(isError, isLoading, isSuccess, error, data);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { state } = useLocation();

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
        registerUser(user);
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (isSuccess) {
    dispatch(addUser(data));
    state.from == "/signup" ? navigate(-2) : navigate(-1);
  }
  let content = "";
  if (
    isError &&
    error &&
    "data" in error &&
    typeof error.data === "object" &&
    "message" in error.data! &&
    typeof error.data.message == "string"
  ) {
    content = error.data.message;
  }
  return (
    <div className="sign-up-container">
      <section>
        <img src={require("../../assets/tent.avif")} />

        <form
          onSubmit={submitHandler}
          ref={formRef}
          noValidate
          className="sign-up-form"
        >
          <FormInput title={"email"} name="email" onChange={handleChange} />
          <FormInput title={"name"} name="username" onChange={handleChange} />
          <FormInput
            title={"password"}
            name="password"
            onChange={handleChange}
          />
          {isError && <ErrorMassage btn={false}>{content}</ErrorMassage>}
          <Button disabled={isLoading} title="sign up">
            {isLoading && <ClipLoader />}
          </Button>
        </form>
      </section>
    </div>
  );
};
