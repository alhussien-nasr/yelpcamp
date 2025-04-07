import React, { MouseEvent, useState } from "react";
import { ReactComponent as Menu } from "../../assets/menu.svg";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./styles.css";
import { addUser } from "../../store/user/slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Fotter } from "../../components/fotter/indes";

export const NavBar = () => {
  const [open, setOpen] = useState(false);
  const user = useAppSelector((store) => store.user.user);
  const dispatch = useAppDispatch();

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  const logoutHandler = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await fetch("http://localhost:8080/user/logout", {
      credentials: "include",
    });
    dispatch(addUser(null));
  };

  const { pathname } = useLocation();

  return (
    <>
      <div className={`nav-bar-container ${open ? "open" : ""}`}>
        <p>YelpCamp</p>
        <Menu className="icon" onClick={toggleMenu} />
        <div className={`link-container ${open ? "show" : ""}`}>
          <Link to="/">Home</Link>
          <Link to="/campgrounds">Campgrounds</Link>
          <Link to="/new">New Campgrounds</Link>
          {!user ? (
            <>
              <Link to="/signup">Sign Up</Link>
              <Link to="/signin" state={{ from: pathname }}>
                Sign In
              </Link>
            </>
          ) : (
            <a href="" onClick={logoutHandler}>
              Log Out
            </a>
          )}
        </div>
      </div>
      <Outlet />
      <Fotter />
    </>
  );
};
