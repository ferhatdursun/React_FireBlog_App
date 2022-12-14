import React, { useState } from "react";
import Block from "../assets/blok.png";
import Button from "@mui/material/Button";
import { Avatar, Paper, TextField, Typography } from "@mui/material";
import {  Stack } from "@mui/system";
import { auth } from "../helpers/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toastSuccessNotify, toastDangerNotify } from "../helpers/toastNotify";

const Register = () => {
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // console.log("2", password);

  const [info, setInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  
  const { firstName, lastName, email, password } = info;

  //? YENI KULLANICI OLUSTURMA
  const createUser = async (email, password, navigate, displayName) => {
    try {
      let userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
        displayName
      );
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });
      toastSuccessNotify("erfolgreich");
      navigate("/");
      console.log(userCredential);
    } catch (err) {
      toastDangerNotify("Error!");
      console.log(err.message);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const displayName = `${firstName} ${lastName}`;
    createUser(email, password, navigate, displayName);
    console.log(email, password);
    console.log("DisplayName", displayName);
  };
  const handeleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
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
          marginTop={10}
          bgcolor="white"
          width={400}
          height={570}
          textAlign="center"
          justifyContent="center"
          alignItems="center"
          padding={3}
          borderRadius={2}
        >
          <Avatar
            alt="Remy Sharp"
            src={Block}
            style={{
              width: "120px",
              height: "120px",
              padding: "2rem",
              background: "#046582",
              marginTop: "1rem",
            }}
          />

          <Typography sx={{ fontFamily: "Girassol", color: "#1f6582" }}>
            <h2>?????? Register ??????</h2>
          </Typography>
          <Stack spacing={2} width={350}>
            <TextField
              id="outlined-basic"
              name="firstName"
              required
              label="FirstName"
              multiline
              variant="outlined"
              type="email"
              onChange={handeleChange}
            />
            <TextField
              id="outlined-basic"
              name="lastName"
              required
              label="LastName"
              variant="outlined"
              type="email"
              onChange={handeleChange}
            />
            <TextField
              id="outlined-basic"
              name="email"
              required
              label="Email"
              variant="outlined"
              type="email"
              onChange={handeleChange}
            />
            <TextField
              id="outlined-basic"
              name="password"
              required
              label="Password"
              variant="outlined"
              type="password"
              onChange={handeleChange}
            />
            <Button type="submit" variant="contained" onClick={handleSubmit}>
              Register
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Register;
