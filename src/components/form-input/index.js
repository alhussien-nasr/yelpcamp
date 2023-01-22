import React, { useState } from "react";
import "./styles.css";

export const FormInput = ({
  onChange,
  title,
  name,
  describtion,
  icon,
  ...rest
}) => {
  return (
    <div className="form-input-container">
      <label htmlFor={title}>{title}</label>
      {describtion ? (
        <textarea id={title} name={name} onChange={onChange} {...rest} />
      ) : (
        <input
          id={title}
          name={name}
          className={icon && "icon"}
          onChange={onChange}
          {...rest}
        />
      )}
    </div>
  );
};
