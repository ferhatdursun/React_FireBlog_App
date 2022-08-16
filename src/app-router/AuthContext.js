import { Details } from "@mui/icons-material";
import { push } from "firebase/database";
import React, { createContext, useEffect, useState } from "react";
import { userObserver } from "../pages/Login";
import NewBlog from "../pages/NewBlog";
import { getDatabase, onValue, ref } from "firebase/database";

//! ilk olarak burada createContext olusturduk.
//! Sonrasinda AuthContextProvider ile useState tanimladik
//! ve return kisminda value degerini alip, icerisinde children olusturduk.
//! Böylece const AuthContext yapisini projenin her yerinde kullanilabilir hale getirdik.
//! bir sonra ki adim da ise App.js de AppRouter'i  AuthContextProvider ile sarmalladik.
//! Yani app.js de AppRouter burada ki provider'in icerisinde ki children degerini aliyor.
//! Son kisimda ise, Navbarda currentUser'i dinamik hale getirmek kaliyor.
//? Sonra ki projeler de yeni global useStateler ekleyip bunlari value degerinin icerisine eklememiz gerekiyor.

//! createContext ile gönderiyoruz. useContext ile yakaliyoruz
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false);
  const [gelenVeri, setGelenVeri] = useState([]);
  //! Details sayfasina verilerin aktarilmasi
  //! Details sayfasindan update butonuna tiklandiktan sonra verilerin UpdateBlog sayfasina aktarilmasi.
console.log(currentUser);
  const GelenVeriler = () => {
    const db = getDatabase();
    const starCountRef = ref(db, "NewBlog");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const userArray = [];
      for (let i in data) {
        console.log("data", data);
        userArray.push({ i, ...data[i] });
      }
      setGelenVeri(userArray);

      console.log("userArry", userArray);
      console.log("gelenVeri", gelenVeri);
    });
  };

  //! burada Login sayfasinda ki userObserver icinde setCurrentUser ile cagriliyor.
  useEffect(() => {
    GelenVeriler();
    // setCurrentUser(JSON.parse(sessionStorage.getItem("user")))
    userObserver(setCurrentUser);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, gelenVeri }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
