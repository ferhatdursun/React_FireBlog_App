import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState, useContext } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { display, Stack } from "@mui/system";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../app-router/AuthContext";
// import { Details } from "../pages/Details";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Dasboard = () => {
  const navigate = useNavigate();
  const { currentUser, gelenVeri } = useContext(AuthContext); //! Bunun ile AuthContext de bulunan user datalarini buraya cektik ve asagida i.author olarak yazdirdik.
  console.log("log;currentUserSon", currentUser.email);
  // ! useEffect icerisinde sonsuz döngüye girmemesi icin kapatmasinin yanina  koymamiz gerekiyor.

  return (
    <div>
      <div>
        <h1 className="Dasboard">──── Dasboard ────</h1>
      </div>
      <div>
        <Grid container justifyContent="center" flexWrap="wrap">
          {gelenVeri?.map((i, id) => {
            return (
              <div key={id}>
                <Grid item>
                  <Card
                    sx={{
                      Width: 245,
                      Height: 550,
                      width: 550,
                      margin: 2,
                    }}
                  >
                    <Grid
                      sx={{ cursor: "pointer" }}
                      onClick={(e) => {
                        navigate(`/Details/${i.i}`);
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="350"
                        width="350"
                        src="Foto"
                        image={i.imgUrl}
                        alt="Paella dish"
                      />

                      <CardContent>
                        <Typography variant="h4">{i.title}</Typography>
                        <Typography variant="h7">
                          <p> {i.date}</p>
                        </Typography>
                        <Typography variant="h7" color="text.secondary">
                          {i.content}
                        </Typography>
                      </CardContent>
                    </Grid>
                    <Typography variant="h7" m={2}>
                      <AccountCircleIcon /> {i.author}
                    </Typography>

                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon sx={{ color: "red" }} />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              </div>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};

export default Dasboard;
