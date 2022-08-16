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
const Dasboard = () => {
  const navigate = useNavigate();
  const { currentUser, gelenVeri } = useContext(AuthContext); //! Bunun ile AuthContext de bulunan user datalarini buraya cektik ve asagida i.author olarak yazdirdik.
  console.log("currentUserSon", currentUser);
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
                      Height: 450,
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

                      <CardContent>
                        <Typography variant="h4">{i.titlex}</Typography>
                        <Typography variant="h4" color="text.secondary">
                          {i.title}
                        </Typography>
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
