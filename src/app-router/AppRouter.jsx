import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dasboard";
import Details from "../pages/Details";
import Login from "../pages/Login";
import NewBlog from "../pages/NewBlog";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import UpdateBlog from "../pages/UpdateBlog";
import Navbar from "../components/Navbar";
import PrivateRouter from "./PrivateRouter";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Details/:id" element={<PrivateRouter />}>
          <Route path="" element={<Details />} />
        </Route>
        <Route path="/Login" element={<Login />} />
        <Route path="/NewBlog" element={<NewBlog />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/UpdateBlog/:id" element={<UpdateBlog />} />
        <Route path="/Navbar" element={<Navbar />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
