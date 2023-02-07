import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Button } from "../../components/button";
import { FormInput } from "../../components/form-input";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { addUser } from "../../store/user/slice";
import { useAppDispatch } from "../../store/hooks";
const initalState = {
  email: "",
  password: "",
  username: "",
};

export const SignUp = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [camp, setCamp] = useState(initalState);
  console.log(camp);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCamp({ ...camp, [name]: value });
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current?.checkValidity()) {
      e.stopPropagation();
      formRef.current?.classList.add("was-validated");
    } else {
      try {
        const data = await fetch("http://localhost:8080/user/", {
          method: "POST",
          body: JSON.stringify(camp),
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json());
        console.log(data);
        dispatch(addUser(data));
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

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
          <Button title="sign up" />
        </form>
      </section>
    </div>
  );
};
