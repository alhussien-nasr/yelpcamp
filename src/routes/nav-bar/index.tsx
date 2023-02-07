import React, { MouseEvent, MouseEventHandler, useRef, useState } from "react";
import { ReactComponent as Menu } from "../../assets/menu.svg";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./styles.css";
import { addUser } from "../../store/user/slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Fotter } from "../../components/fotter/indes";
export const NavBar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const clickHandler = () => {
    setOpen((val) => !val);
  };
  const user = useAppSelector((store) => store.user.user);
  const dispatch = useAppDispatch();

  const logoutHandler = async (
    e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    await fetch("http://localhost:8080/user/logout", {
      credentials: "include",
    });
    dispatch(addUser(null));
  };
  const { pathname } = useLocation();
  console.log(pathname, "pathname");
  return (
    <>
      <div className={`nav-bar-container ${open && "open"}`}>
        <p>YelpCamp</p>
        <Link to="/">Home</Link>
        <Link to="/campgrounds">Campgrounds</Link>
        <Link to="/new">new Campgrounds</Link>
        {!user ? (
          <>
            <Link to="/signup">sign up</Link>
            <Link to="/signin" state={{ from: pathname }}>
              sign in
            </Link>
          </>
        ) : (
          <a href="" onClick={logoutHandler}>
            log out
          </a>
        )}
        <Menu className="icon" onClick={clickHandler} />
      </div>
      <Outlet />
      <Fotter />
    </>
  );
};
