import * as React from "react";
import { Paper, Typography } from "@mui/material";
import { Stack } from "@mui/material";
import { Avatar } from "@mui/material";
import newblog from "../assets/blok.png";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { AuthContext } from "../app-router/AuthContext";

export default function Profile() {
  const { currentUser } = useContext(AuthContext);

  return (
    <Paper
      elevation={0}
      style={{ background: `url(https://picsum.photos/1600/900)` }}
    >
      <Stack
        height="100vh"
        width="100vw"
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          marginTop={2}
          bgcolor="white"
          width={500}
          height="83vh"
          // boxShadow={"10px 5px 5px gray"}
           borderRadius={"20px"}
        >
          <Avatar
            alt="Remy Sharp"
            src={newblog}
            style={{
              width: "120px",
              height: "120px",
              padding: "2rem",
              background: "#046582",
              marginTop: "1rem",
            }}
          />
          <Typography
            style={{
              fontFamily: "Girassol",
              color: "#046582",
              fontSize: "0.7rem",
            }}
          >
            <h1>── My Profile ──</h1>
          </Typography>
          <Stack width={400} height={370} spacing={5}>
            <h2 style={{ fontFamily: "Girassol" }}>
              Name:
              <p>
                <p style={{ color: "#046582" }}>{currentUser?.displayName}</p>
              </p>
            </h2>
            <h2>
              E-Mail:
              <p>
                <p style={{ color: "#046582" }}>{currentUser?.email}</p>
              </p>
            </h2>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
}
