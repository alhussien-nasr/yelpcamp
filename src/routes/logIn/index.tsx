import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Button } from "../../components/button";
import { FormInput } from "../../components/form-input";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles.css";
import { addUser } from "../../store/user/slice";
import { useAppDispatch } from "../../store/hooks";

const initalState = {
  password: "",
  username: "",
};

export const LogIn = () => {
  const { state } = useLocation();

  const formRef = useRef<HTMLFormElement>(null);

  const [camp, setCamp] = useState(initalState);

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
        const data = await fetch("https://yelpcamp-api.onrender.com/user/login", {
          method: "POST",
          body: JSON.stringify(camp),
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json());
        console.log(data);
        dispatch(addUser(data));

        state.from == "/signup" ? navigate(-2) : navigate(-1);
      } catch (error) {
        console.log(error);
      }
    }
  };

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
          <Button title="log in" color="green"/>
        </form>
      </section>
    </div>
  );
};
