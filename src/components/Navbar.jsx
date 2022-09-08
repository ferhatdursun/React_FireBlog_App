import React, { useContext } from "react";
import Fd from "../assets/fd.png";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import {  signOut } from "firebase/auth";
import { auth } from "../helpers/firebase";
import { AuthContext } from "../app-router/AuthContext";
import {
  toastDangerNotify,
  toastSuccessNotify,
} from "../helpers/toastNotify";

const Navbar = () => {
  const navigate = useNavigate();

  //! useContext ile AuthContext de ki currentUser'i yakaliyoruz.
  const { currentUser } = useContext(AuthContext);
  //  const currentUser = { displayName: "ferhat" };
  // const currentUser = false;


  //! Logout
  const logOut = () => {
    try {
      signOut(auth).then((res) => {
        console.log(res);
        toastSuccessNotify("Logged out successfully!");
      });
      navigate("/");
    } catch (err) {
      toastDangerNotify("Error!");
      console.log(err.message);
    }
  };

  return (
    <div className="Navbar">
      <a href="https://www.linkedin.com/in/ferhat-dursun1" target="_blank">
        <img src={Fd} alt="" width="85px" className="claruswaynavbar" />
      </a>
      <div className="navbarEDEN" onClick={() => navigate("/")}>
        <i>
          <hr className="block" width="30px" />
        </i>
        <i className="eden"> {"<Ferhat/>"}</i>
        <i className="block"> BLOG</i>
        <i>
          <hr className="block" width="30px" />
        </i>
      </div>
      <div>
        {currentUser ? (
          <>
            <button
              className="Profile"
              onClick={() => {
                navigate("/Profile");
              }}
            >
              Profile
            </button>
            <button
              className="Profile"
              onClick={() => {
                navigate("/NewBlog");
              }}
            >
              New
            </button>
            <button className="NLogout" onClick={logOut}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Button
              variant="contained"
              sx={{ mr: 1 }}
              onClick={() => {
                navigate("/Login");
              }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                navigate("/Register");
              }}
            >
              Register
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
