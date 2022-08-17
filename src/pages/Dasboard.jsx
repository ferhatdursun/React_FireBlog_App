import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../app-router/AuthContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCommentIcon from "@mui/icons-material/AddComment";
import Fd from "../assets/fd.png";

const Dasboard = () => {
  const navigate = useNavigate();
  const { currentUser, gelenVeri } = useContext(AuthContext); //! Bunun ile AuthContext de bulunan user datalarini buraya cektik ve asagida i.author olarak yazdirdik.
  console.log("currentUserSon", currentUser);
  // ! useEffect icerisinde sonsuz döngüye girmemesi icin kapatmasinin yanina  koymamiz gerekiyor.

  return (
    <div style={{ backgroundColor: "#F1E9E3" }}>
      <div>
        <h1 className="Dasboard" xs={10} md={6} lg={4} xl={2}>
          ──── Dasboard ────
        </h1>
      </div>
      <div>
        <Grid container justifyContent="center" flexWrap="wrap">
          {gelenVeri?.map((i, id) => {
            return (
              <div key={id}>
                <Grid item xs={10} md={6} lg={4} xl={2}>
                  <Card
                    sx={{
                      maxHeight: 650,
                      width: 480,
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

                      <CardContent style={{backgroundColor:"#D9D9D9"}} >
                        <Typography
                          variant="h6"
                          color="text.secondary"
                          style={{
                            height: "30px",
                            overflow: "hidden",
                            fontFamily: "Girassol",
                            color: "#1f6582",
                          }}
                        >
                          {i.title}
                        </Typography>
                        <Typography variant="h7">
                          <p> {i.date}</p>
                        </Typography>

                        <Typography
                          
                          variant="body1"
                          color="text.secondary"
                          style={{ height: "70px", overflow: "hidden" }}
                        >
                          {i.content}
                        </Typography>
                      </CardContent>
                    </Grid>
                    <Typography variant="h7" m={2} >
                      <AccountCircleIcon /> {i.author}
                    </Typography>

                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon sx={{ color: "red" }} />
                      </IconButton>
                      <IconButton aria-label="share">
                        <AddCommentIcon />
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
