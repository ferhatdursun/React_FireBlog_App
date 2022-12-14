import * as React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/material";
import { Avatar } from "@mui/material";
import newblog from "../assets/blok.png";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { AuthContext } from "../app-router/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Paper
      elevation={0}
      style={{ background: `url(https://picsum.photos/1600/900)` }}
    >
      <Grid xs={10} md={6} lg={4} xl={2}>
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
            marginTop={2}
            bgcolor="white"
            width={500}
            height="80vh"
            boxShadow={"10px 5px 5px gray"}
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
                marginTop: "2rem",
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
            <Stack width={400} height={370}>
              <h2 style={{ fontFamily: "Girassol" }}>
                Name:
                <p>
                  <p style={{ color: "#046582" }}>{currentUser?.displayName}</p>
                </p>
              </h2>
              <h2>
                E-Mail:
                <p>
                  <p style={{ color: "#046582" }}>
                    {currentUser?.email}
                    <Button
                      style={{
                        backgroundColor: "Black",
                        float: "right",
                      }}
                      variant="contained"
                      disableElevation
                      onClick={(e) => {
                        navigate(-1);
                      }}
                    >
                      Back
                    </Button>
                  </p>
                </p>
              </h2>
            </Stack>
          </Stack>
        </Stack>
      </Grid>
    </Paper>
  );
}
