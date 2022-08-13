import React, { useState } from "react";
import Block from "../assets/blok.png";
import Button from "@mui/material/Button";
import { Avatar, Paper, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { getDatabase, ref, set, push } from "firebase/database";
import { firebase,auth } from "../helpers/firebase";
const NewBlog = () => {


  const [title, setTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [content, setContent] = useState("");


  const create = (e) => {
    e.preventDefault();
    userData(title, imgUrl, content);
  };

    function userData(title, imgUrl, content) {
      const database = getDatabase();
      const userRef = ref(database, "newBlog/");
      const NewUserRef = push(userRef);
      set(NewUserRef, {
        title: title,
        imgUrl: imgUrl,
        content: content,
      });
      setTitle("")
      setImgUrl("")
      setContent("")
      console.log(userRef);
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
          marginTop={5}
          bgcolor="white"
          width={500}
          height={750}
          textAlign="center"
          justifyContent="center"
          alignItems="center"
          padding={3}
          borderRadius={2}
        >
          <img src={Block} alt="" height={100} width={150} />

          <Typography
            sx={{
              fontFamily: "Girassol",
              color: "#1f6582",
              display: "flex",
            }}
          >
            <h2 className="NewBlog">── New</h2> <h2>Blog──</h2>
          </Typography>
          <Stack spacing={2} width={350} height={400}>
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              type="email"
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Image URL*"
              variant="outlined"
              type="email"
              onChange={(e) => setImgUrl(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Content*"
              variant="outlined"
              type="text-area"
              multiline
              rows={8}
              onChange={(e)=>setContent(e.target.value)}
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
