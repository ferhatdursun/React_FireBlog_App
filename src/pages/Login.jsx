import React from "react";
import Block from "../assets/blok.png";
import Button from "@mui/material/Button";
import { Avatar, Paper, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toastSuccessNotify, toastDangerNotify } from "../helpers/toastNotify";
import {
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../helpers/firebase";
import { GoogleAuthProvider } from "firebase/auth";

//? AuthContext sayfasindan burada ki userObserver cagriliyor
//? login ise navbarda ki butonlar profil vs oluyor.Login degil ise login ve register butonlari görünüyor.
//? Kullanıcının signin olup olmadığını takip eden ve kullanıcı değiştiğinde yeni kullanıcıyı response olarak dönen firebase metodu
export const userObserver = (setCurrentUser) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(false);
    }
  });
};

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
      sessionStorage.setItem("user", JSON.stringify(userCredential.user));
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
          marginTop={14}
          bgcolor="white"
          width={400}
          height="80vh"
          textAlign="center"
          justifyContent="center"
          alignItems="center"
          padding={3}
          borderRadius={2}
        >
          <Avatar
            style={{
              width: "132px",
              height: "132px",
              padding: "2rem",
              background: "#046582",
              marginTop: "1rem",
            }}
            src={Block}
            alt=""
          />

          <Typography
            sx={{
              fontFamily: "Girassol",
              color: "#1f6582",
              fontSize: "0.9rem",
            }}
          >
            <h1>── Login ──</h1>
          </Typography>
          <Stack spacing={2} width={350}>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              type="email"
              name="email"
              size="small"
              required
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              size="small"
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
          </Stack>
          <Button
            // type="button"
            sx={{
              fontFamily: "Arial, Helvetica, sans-serif",
              fontSize: "large", width: "22rem", marginTop:"1rem", height:"2.2rem",
            }}
            
            variant="outlined"
            onClick={() => signUpProvider(navigate)}
          >
            <span>WITH</span>
            <span className="cizgi">--</span>
            <span>G</span> <span className="kirmizi">o</span>{" "}
            <span className="turuncu">o</span> <span>g</span>{" "}
            <span className="yesil">l</span> <span className="kirmizi">e</span>{" "}
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Login;
