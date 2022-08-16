import React from "react";
import Button from "@mui/material/Button";
import { Paper, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Block from "../assets/blok.png";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../app-router/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Grid } from "@mui/material";
import { getDatabase, onValue, ref, update } from "firebase/database";

const UpdateBlog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState();
  const [imgUrl, setImgUrl] = useState();
  const [content, setContent] = useState();

  //! Details sayfasinda ki verileri buraya alabilmek icin yine AuthContext.js sayfasinda ki setGelenVeri ile gelenVerinin icine gömülen datalari kullandik.
  const { gelenVeri, currentUser } = useContext(AuthContext);
  const { id } = useParams();
  const date = new Date().toDateString();

  console.log("UpdateBlogTitle", title);

  //! Burada yorumda olan satirlar update islemi icin kullanilabilir. Ama bu satirlari AutContext sayfasina tasidik. Ve burada useContext ile bu satirlara ulasiyoruz.
  // useEffect(() => {
  //   GelenVeriler()
  // },[])

  // const GelenVeriler = () => {
  //   const db = getDatabase();
  //   const starCountRef = ref(db, "NewBlog");
  //   onValue(starCountRef, (snapshot) => {
  //     const data = snapshot.val();
  //     const userArray = [];
  //     for (let i in data) {
  //       console.log("data", data);
  //       userArray.push({ i, ...data[i] });
  //     }
  //     setUpdateBlogVeri(userArray);

  //     console.log("userArry", userArray);

  //   });
  // };

  //! Update islemi
  const writeNewBlog = () => {
    const db = getDatabase();
    const postData = {
      title: title,
      imgUrl: imgUrl,
      content: content,
      author: currentUser.email,
      date: date,
    };
    // successNote("Successfully Updated");
    navigate("/");
    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    updates["/NewBlog/" + id] = postData;
    return update(ref(db), updates);
  };
  return (
    <div>
      <div key={id}>
        {gelenVeri.map((i) =>
          i.i == id ? (
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
                      value={title ? title : setTitle(i.title)}
                      onChange={(e) => setTitle(e.target.value)}
                    />

                    <TextField
                      id="outlined-basic"
                      label="Image URL*"
                      variant="outlined"
                      type="email"
                      value={imgUrl ? imgUrl : setImgUrl(i.imgUrl)}
                      onChange={(e) => setImgUrl(e.target.value)}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Content*"
                      variant="outlined"
                      type="text-area"
                      multiline
                      rows={8}
                      value={content ? content : setContent(i.content)}
                      onChange={(e) => setContent(e.target.value)}
                    />

                    <Button
                      onClick={writeNewBlog}
                      variant="contained"
                      type="submit"
                    >
                      UPDATE
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </Paper>
          ) : null
        )}
      </div>
    </div>
  );
};

export default UpdateBlog;
