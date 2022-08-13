import React, { useState } from "react";
import Block from "../assets/blok.png";
import Button from "@mui/material/Button";
import { Avatar, Paper, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { createUser } from "../helpers/firebase";
import { getDatabase, ref, set, push, update } from "firebase/database";
import { firebase, auth } from "../helpers/firebase";
import { create } from "@mui/material/styles/createTransitions";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toastSuccessNotify, toastDangerNotify } from "../helpers/toastNotify";
const Register = () => {
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // console.log("2", password);
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { firstName, lastName, email, password } = info;

  //? YENI KULLANICI OLUSTURMA
  const createUser = async (email, password) => {
    try {
      let userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      toastSuccessNotify("erfolgreich")
      navigate("/Login");
      console.log(userCredential);
    } catch (err) {
      toastDangerNotify("Error!")
      console.log(err.message);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(email, password,navigate);
    console.log(email, password);
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
            <h3>── Register ──</h3>
          </Typography>
          <Stack spacing={2} width={350}>
            <TextField
              id="outlined-basic"
              name="firstName"
              required
              label="First Name"
              variant="outlined"
              type="email"
              onChange={handeleChange}
            />
            <TextField
              id="outlined-basic"
              name="lastName"
              required
              label="Last Name"
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
