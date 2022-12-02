import React, { useContext, useState } from "react";
import Block from "../assets/blok.png";
import Button from "@mui/material/Button";
import { Avatar, Paper, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { getDatabase, ref, set, push } from "firebase/database";
import { toastSuccessNotify, toastDangerNotify } from "../helpers/toastNotify";
import { AuthContext } from "../app-router/AuthContext";
import { useNavigate } from "react-router-dom";

const NewBlog = () => {
  const [title, setTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [content, setContent] = useState("");

  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  //! Yeni Blog yazisi ekleme
  const create = (e) => {
    e.preventDefault();
    userData(title, imgUrl, content);
  };
  const date = new Date().toDateString();
  function userData() {
    try {
      const database = getDatabase();
      const userRef = ref(database, "NewBlog/");
      const NewUserRef = push(userRef);
      set(NewUserRef, {
        title: title,
        imgUrl: imgUrl,
        content: content,
        author: currentUser.email,
        date: date,
      });

      toastSuccessNotify("Added to Dasboard");
      navigate("/");
      setTitle("");
      setImgUrl("");
      setContent("");
      //! Bunlar, veriler gönderildikten sonra inputlarin iclerinin bosalmasi icin.
    } catch (err) {
      toastDangerNotify(err.message);
    }
  }

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
          marginTop={20}
          bgcolor="white"
          width={500}
          height="83vh"
          textAlign="center"
          justifyContent="center"
          alignItems="center"
          padding={1}
          paddingBottom={3}
          boxShadow={"10px 5px 5px gray"}
          borderRadius={"20px"}
        >
          <Avatar
            src={Block}
            alt="NewBlogFoto"
            style={{
              width: "110px",
              height: "110px",
              padding: "2rem",
              background: "#046582",
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
          />

          <Typography
            sx={{
              fontFamily: "Girassol",
              color: "#1f6582",
              display: "flex",
              variant: "h2",
            }}
          ></Typography>
          <Stack spacing={2} width={350} height={400}>
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              type="email"
              required
              multiline
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Image URL"
              variant="outlined"
              type="email"
              required
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Content"
              variant="outlined"
              type="text-area"
              multiline
              required
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Button onClick={create} variant="contained" type="submit">
              SUBMIT
            </Button>
            <Button
              onClick={(e) => {
                navigate(-1);
              }}
              variant="contained"
              type="submit"
              style={{ backgroundColor: "black" }}
            >
              Back
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default NewBlog;
