import React, { createContext, useEffect, useState } from "react";
import { userObserver } from "../pages/Login";

//! ilk olarak burada createContext olusturduk.
//! Sonrasinda AuthContextProvider ile useState tanimladik
//! ve return kisminda value degerini alip, icerisinde children olusturduk.
//! Böylece const AuthContext yapisini projenin her yerinde kullanilabilir hale getirdik.
//! bir sonra ki adim da ise App.js de AppRouter'i  AuthContextProvider ile sarmalladik.
//! Yani app.js de AppRouter burada ki provider'in icerisinde ki children degerini aliyor.
//! Son kisimda ise, Navbarda currentUser'i dinamik hale getirmek kaliyor.
//? Sonra ki projeler de yeni global useStateler ekleyip bunlari value degerinin icerisine eklememiz gerekiyor.

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false);


  
  //! burada Login sayfasinda ki userObserver icinde setCurrentUser ile cagriliyor.
  useEffect(() => {
    // setCurrentUser(JSON.parse(sessionStorage.getItem("user")))
    userObserver(setCurrentUser);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
