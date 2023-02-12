import React, { MouseEvent, MouseEventHandler, useRef, useState } from "react";
import { ReactComponent as Menu } from "../../assets/menu.svg";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./styles.css";
import { addUser, resetUser } from "../../store/user/slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Fotter } from "../../components/fotter/indes";
import { useLogOutUserMutation } from "../../store/user/userAPI";
export const NavBar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [logout, { isSuccess }] = useLogOutUserMutation();
  const clickHandler = () => {
    setOpen((val) => !val);
  };

  const user = useAppSelector((store) => store.user.user);
  console.log(user, "user");
  const dispatch = useAppDispatch();

  const logoutHandler = async (
    e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    logout();
  };

  if (isSuccess) dispatch(resetUser());

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
            <Link to="/signup" state={{ from: pathname }}>sign up</Link>
            <Link to="/signin" state={{ from: pathname }}>
              sign in
            </Link>
          </>
        ) : (
          <a href="" onClick={logoutHandler}>
            log out
          </a>
        )}
      </div>
      <Outlet />
      <Fotter />
    </>
  );
};
