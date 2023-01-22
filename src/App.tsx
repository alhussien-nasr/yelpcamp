import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Home } from "./routes/home";
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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={"/"} element={<NavBar />}>
      <Route path="/" element={<Home />} />,
      <Route path="/new" element={<NewCamp />} />,
      <Route path="/:id" element={<Camp />} />,
      <Route path="/:id/edit" element={<Edit />} />,
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
