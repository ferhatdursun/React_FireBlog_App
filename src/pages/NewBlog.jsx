import React, { useContext, useState } from "react";
import { initializeApp } from "firebase/app";
import Block from "../assets/blok.png";
import Button from "@mui/material/Button";
import { Avatar, Paper, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { getDatabase, ref, set, push } from "firebase/database";
import { firebase, auth } from "../helpers/firebase";
import { getAuth } from "firebase/auth";
import { toastSuccessNotify, toastDangerNotify } from "../helpers/toastNotify";
import { AuthContext } from "../app-router/AuthContext";

const NewBlog = () => {
  const [title, setTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [content, setContent] = useState("");
  const { currentUser } = useContext(AuthContext);

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
      setTitle("");
      setImgUrl("");
      setContent("");
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
          marginTop={10}
          bgcolor="white"
          width={500}
          height={600}
          textAlign="center"
          justifyContent="center"
          alignItems="center"
          padding={3}
          borderRadius={2}
        >
          <Avatar
            src={Block}
            alt="NewBlogFoto"
            style={{
              width: "220px",
              height: "220px",
              padding: "2rem",
              background: "#046582",
              marginTop: "1rem",
            }}
          />

          <Typography
            sx={{
              fontFamily: "Girassol",
              color: "#1f6582",
              display: "flex",
              variant: "h2",
            }}
          >
            {/* <h2 className="NewBlog">── New</h2> <h2>Blog──</h2> */}
          </Typography>
          <Stack spacing={2} width={350} height={400}>
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              type="email"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Image URL*"
              variant="outlined"
              type="email"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Content*"
              variant="outlined"
              type="text-area"
              multiline
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <Button onClick={create} variant="contained" type="submit">
              SUBMIT
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default NewBlog;
