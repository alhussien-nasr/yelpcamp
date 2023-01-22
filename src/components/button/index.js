import React from "react";
import "./styles.css";
export const Button = ({ title, onClick, green, color }) => {
  return (
    <button
      onClick={onClick}
      style={color && { backgroundColor: color }}
      className="btn-container"
    >
      {title}
    </button>
  );
};
