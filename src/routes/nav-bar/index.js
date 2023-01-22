import React, { useRef, useState } from "react";
import { ReactComponent as Menu } from "../../assets/menu.svg";
import { Link, Outlet } from "react-router-dom";
import "./styles.css";
import { Fotter } from "../../components/fotter/indes";
export const NavBar = () => {
  const [open, setOpen] = useState(false);
  const clickHandler = () => {
    setOpen(!open);
  };
  return (
    <>
      <div className={`nav-bar-container ${open && "open"}`}>
        <p>YelpCamp</p>
        <div className={`link-container  ${open && "visible"}`}>
          <Link to="/">Home</Link>
          <Link>Campgrounds</Link>
          <Link to="/new">new Campgrounds</Link>
        </div>
        <Menu className="icon" onClick={clickHandler} />
      </div>
      <Outlet />
      <Fotter />
    </>
  );
};
