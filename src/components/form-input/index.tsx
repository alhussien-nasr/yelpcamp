import React, { ChangeEvent } from "react";
import "./styles.css";

type propstypes = {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  title: string;
  name: string;
  describtion?: boolean;
  icon?: boolean;
  [x: string]: any;
};

export const FormInput = ({
  onChange,
  title,
  name,
  describtion,
  icon,
  ...rest
}: propstypes) => {
  return (
    <div className="form-input-container">
      <label htmlFor={title}>{title}</label>

      <input
        id={title}
        name={name}
        required
        className={`${icon && "icon"} form-control`}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
};
