import React, { MouseEvent, useEffect, useRef } from "react";
import "./styles.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addUser } from "../../store/user/slice";
import { Button } from "../../components/button";
export const Home = () => {
  const user = useAppSelector((store) => store.user.user);
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logoutHandler = async (
    e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    await fetch("http://localhost:8080/user/logout", {
      credentials: "include",
    });
    dispatch(addUser(null));
  };

  return (
    <div className="home-container">
      <nav>
        <h4>YelpCamp</h4>
        <div className="link-container">
          <Link to={"/"} className="active">
            Home
          </Link>
          <Link to={"campgrounds"}>Campeground</Link>
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
        </div>
      </nav>
      <section>
        <h2>YelpCamp</h2>
        <p>Welcome to Yelpcamp!</p>
        <p>Jump right in and explore our many campgrounds.</p>
        <p> Feel free to share some of your own and comment on others!</p>
        <Button
          color="white"
          onClick={() => navigate("campgrounds")}
          title="View Campgrounds"
        />
      </section>
    </div>
  );
};
