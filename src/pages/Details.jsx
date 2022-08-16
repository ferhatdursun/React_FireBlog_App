import { Card, Grid } from "@mui/material";
import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../app-router/AuthContext";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import { getDatabase, remove, ref } from "firebase/database";
import { toastSuccessNotify, toastDangerNotify } from "../helpers/toastNotify";
import AddCommentIcon from "@mui/icons-material/AddComment";
const Details = () => {
  const navigate = useNavigate();

  //! Verileri useParams ile useContext araciligi ile buraya cektik.
  const {currentUser, gelenVeri } = useContext(AuthContext);
  const { id } = useParams();
  // console.log("Probs", gelenVeri);
// console.log("currentUserEmail",currentUser.email)
  //! Card Silme
  const DeleteData = (id) => {
    try {
      const database = getDatabase();
      remove(ref(database, "NewBlog/" + id));
      console.log("Details id", id);
      toastSuccessNotify("Deleted");
    } catch (err) {
      toastDangerNotify(err.message);
    }
  };

  return (
    <div>
      <div>
        <h1 className="Dasboard">──── Details ────</h1>
      </div>
      <Grid container justifyContent="center">
        {gelenVeri.map((i) =>
          i.i == id ? (
            <Card>
              <Card justifyContent="center">
                <CardMedia
                  component="img"
                  height="354"
                  width="300"
                  src="Foto"
                  image={i.imgUrl}
                  alt="Paella dish"
                  //
                />
                <Typography variant="h5" m={2}>
                  {i.title}
                </Typography>
                <Typography variant="h7" m={2}>
                  {i.content}
                </Typography>

                <Typography variant="h6" m={2}>
                  <AccountCircleIcon />
                  {i.author}

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
              {currentUser.email === i.author  ?(
              <Grid container justifyContent="center" margin={2}>
                
                <Button
                  variant="contained"
                  disableElevation
                  onClick={(e) => {
                    navigate(`/UpdateBlog/${i.i}`);
                  }}
                >
                  UPDATE
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    DeleteData(i.i);
                  }}
                >
                  DELETE
                </Button>
            </Grid>
            ): null}
            </Card>
          ) : null
        )}
        <Grid container justifyContent="center" margin={4}></Grid>
      </Grid>
    </div>
  );
};

export default Details;
