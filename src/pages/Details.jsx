import { Card, Grid } from "@mui/material";
import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../app-router/AuthContext";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import { getDatabase, remove, ref } from "firebase/database";
import { toastSuccessNotify, toastDangerNotify } from "../helpers/toastNotify";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { Stack } from "@mui/system";

const Details = () => {
  const navigate = useNavigate();

  //! Verileri useParams ile useContext araciligi ile buraya cektik.
  const { currentUser, gelenVeri } = useContext(AuthContext);
  const { id } = useParams();
  // console.log("Probs", gelenVeri);
  // console.log("currentUserEmail",currentUser.email)

  const gelenBlog = gelenVeri?.filter((item) => item.i === id);
  console.log(gelenVeri, id);
  console.log("GelenBlog;", gelenBlog);

  
  //! Delete Card 
  const DeleteData = (id) => {
    try {
      const database = getDatabase();
      remove(ref(database, "NewBlog/" + id));
      console.log("Details id", id);
      navigate("/");
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
      <Stack justifyContent="center" alignItems="center">
        <Stack width="900px">
          <Card>
            <Card justifyContent="center">
              <CardMedia
                component="img"
                height="354"
                width="250"
                src="Foto"
                image={gelenBlog[0].imgUrl}
                alt="Paella dish"
                //
              />
              <Typography variant="h5" m={2}>
                {gelenBlog[0].title}
              </Typography>
              <Typography variant="h7" m={2}>
                {gelenBlog[0].date}
              </Typography>
              <br />
              <br />
              <Typography variant="h7" m={2}>
                {gelenBlog[0].content}
              </Typography>

              <Typography variant="h6" m={2}>
                <AccountCircleIcon />
                {gelenBlog[0].author}
              </Typography>

              <CardActions
                disableSpacing
                style={{
                  display: "flex",
                  alignItems: "end",
                  justifyContent: "space-between",
                }}
              >
                <Stack style={{ display: "block" }}>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon sx={{ color: "red" }} />
                  </IconButton>
                  <IconButton aria-label="share">
                    <AddCommentIcon />
                  </IconButton>
                </Stack>
                <Stack>
                  <Button
                    style={{
                      backgroundColor: "Black",
                    }}
                    variant="contained"
                    disableElevation
                    onClick={(e) => {
                      navigate(-1);
                    }}
                  >
                    Back
                  </Button>
                </Stack>
              </CardActions>
            </Card>
            {currentUser.email === gelenBlog[0].author ? (
              <Grid container justifyContent="center" margin={2}>
                <Button
                  variant="contained"
                  disableElevation
                  onClick={(e) => {
                    navigate(`/UpdateBlog/${gelenBlog[0].i}`);
                  }}
                >
                  UPDATE
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    DeleteData(gelenBlog[0].i);
                  }}
                >
                  DELETE
                </Button>
              </Grid>
            ) : null}
          </Card>
        </Stack>
      </Stack>
    </div>
  );
};

export default Details;
