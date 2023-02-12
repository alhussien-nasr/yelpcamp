import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Campgrounds } from "./routes/campgrounds";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { NewCamp } from "./routes/new-camp";
import { Camp } from "./routes/camp";
import Edit from "./routes/edit/indes";
import { NavBar } from "./routes/nav-bar";
import { NoMatch } from "./components/no-match/indes";
import { Fotter } from "./components/fotter/indes";
import { SignUp } from "./routes/sign-up";
import { LogIn } from "./routes/logIn";
import { useAppSelector } from "./store/hooks";
import { Home } from "./routes/home";
function App() {
  const user = useAppSelector((store) => store.user.user);
  useEffect(() => {}, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path={"/"} element={<Home />} />,
        <Route path={"/"} element={<NavBar />}>
          <Route path="/Campgrounds" element={<Campgrounds />} />,
          <Route path="/new" element={<NewCamp />} />,
          <Route path="/Campgrounds/:id" element={<Camp />} />,
          <Route path="Campgrounds/:id/edit" element={<Edit />} />,
          {!user && [
            <Route path="/signup" element={<SignUp />} />,
            <Route path="/signin" element={<LogIn />} />,
          ]}
          <Route path="*" element={<NoMatch />} />,
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
