import React from "react";
import Block from "../assets/blok.png";
import Button from "@mui/material/Button";
import { Paper, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toastSuccessNotify, toastDangerNotify } from "../helpers/toastNotify";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../helpers/firebase";
import { GoogleAuthProvider } from "firebase/auth";

const Login = () => {
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate("");
  const { email, password } = info;

  //! Form onSubmit islemi
  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(email, password, navigate);
    console.log(email.at, password);
  };

  //! inputlarin icerisinde ki girdileri yakalamak icin
  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  //! Login islemi
  const signIn = async (email, password, navigate) => {
    try {
      let userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      toastSuccessNotify("Erfolgreich");
      navigate("/");
    } catch (err) {
      toastDangerNotify(err.message);
    }
  };

  //! With Google SignIn
  const signUpProvider = (navigate) => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        toastSuccessNotify("Erfolgreich");
        navigate("/");
      })
      .catch((err) => {
        toastDangerNotify(err.message);
      });
  };

  //! ForgotPassword
  const forgotPassword = (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toastSuccessNotify("Please check your mail box");
      })
      .catch((err) => {
        toastDangerNotify(err.message);
      });
  };

  return (
    <Paper
      style={{
        background: `url(https://picsum.photos/1600/900)`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Stack
        textAlign="center"
        justifyContent="center"
        alignItems="center"
        width="100vw"
        height="100vh"
      >
        <Stack
          marginBottom={20}
          marginTop={5}
          bgcolor="white"
          width={400}
          height={550}
          textAlign="center"
          justifyContent="center"
          alignItems="center"
          padding={3}
          borderRadius={2}
        >
          <img src={Block} alt="" height={150} width={150} />

          <Typography sx={{ fontFamily: "Girassol", color: "#1f6582" }}>
            <h3>── Login ──</h3>
          </Typography>
          <Stack spacing={2} width={350}>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              type="email"
              name="email"
              required
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              required
              onChange={handleChange}
            />
            <Stack
              className="FPassword"
              onClick={() => {
                forgotPassword(email);
              }}
            >
              <u>Forgot Password?</u>
            </Stack>
            <Button onClick={handleSubmit} variant="contained">
              Login
            </Button>
            <Button
              sx={{
                fontFamily: "Arial, Helvetica, sans-serif",
                fontSize: "large",
              }}
              variant="outlined"
              onClick={() => signUpProvider(navigate)}
            >
              <span>WITH</span>
              <span className="cizgi">--</span>
              <span>G</span> <span className="kirmizi">o</span>{" "}
              <span className="turuncu">o</span> <span>g</span>{" "}
              <span className="yesil">l</span>{" "}
              <span className="kirmizi">e</span>{" "}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Paper>

    /* <div className="loginContainer">
      <div>
        <img src={Block} alt="" />
      </div>

       <div className="Loginyazi">
        <i>
          <hr className="block" width="30px" />
        </i>
        <i>LOGIN</i>
        <i>
          <hr className="block" width="30px" />
        </i>
      </div>

      <form action="" className="form">
        <input type="email" value="" placeholder="Email" />
        <input type="password" value="" placeholder="Password" />

        <Button variant="contained">LOGIN</Button>

        <Button variant="contained">WITH GOOGLE</Button>
      </form>

    </div> */
  );
};

export default Login;
