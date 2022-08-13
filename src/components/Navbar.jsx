import React, { useContext } from "react";
import FotoClarusway from "../assets/cw.jpeg";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../helpers/firebase";
import { AuthContext } from "../app-router/AuthContext";
import { toastWarnNotify, toastDangerNotify } from "../helpers/toastNotify";

// export const userObserver = (setCurrentUser) => {
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       setCurrentUser(user);
//     } else {
//       setCurrentUser(false);
//     }
//   });
// };


const Navbar = () => {
  const navigate = useNavigate();
  // const { currentUser } = useContext(AuthContext);
  //  const currentUser = { displayName: "ferhat" };
    const currentUser = false;

//! Logout 
  
  const logOut = () => {
    try {
      signOut(auth).then((res) => {
        console.log(res);
        toastWarnNotify("Logged out successfully!");
      });
    } catch (err) {
      toastDangerNotify("Error!");
      console.log(err.message);
    }
  }

  return (
    <div className="Navbar">
      <a
        href="https://www.clarusway.de"
        target="_blank"
        className="claruswaynavbar"
      >
        <img src={FotoClarusway} alt="" width="35px" />
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
            <button className="NLogout" onClick={logOut}>Logout</button>
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
