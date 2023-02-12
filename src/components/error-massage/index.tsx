import React, { MouseEvent, useState } from "react";
import "./styles.css";
type propsType = {
  onClick?: () => void;
  children: React.ReactNode;
  btn?: boolean;
};
export const ErrorMassage = ({ children, onClick, btn = true }: propsType) => {
  return (
    <div className="alert alert-danger error-massage-container" role="alert">
      {children}
      {btn && (
        <button type="button" className="btn-close" onClick={onClick}></button>
      )}
    </div>
  );
};
