import React, { MouseEvent, useState } from "react";
import "./styles.css";
type propsType = {
  massage: string | null;
  onClick: () => void;
};
export const ErrorMassage = ({ massage, onClick }: propsType) => {
  return (
    <div className="alert alert-danger error-massage-container" role="alert">
      {massage}
      <button type="button" className="btn-close" onClick={onClick}></button>
    </div>
  );
};
