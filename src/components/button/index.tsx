import React from "react";
import "./styles.css";

type propsTypes = {
  title: string;
  onClick?: () => void;
  color?: string;
  [x: string]: any;
};

export const Button = ({
  title,
  onClick,
  color,
  children,
  ...rest
}: propsTypes) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: color && color,
        color: color == "white" ? "black" : "white",
      }}
      {...rest}
      className="btn-container"
    >
      {children || title}
    </button>
  );
};
