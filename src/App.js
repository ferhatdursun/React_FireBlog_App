import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRouter from "./app-router/AppRouter";
import AuthContextProvider from "./app-router/AuthContext";


const App = () => {
  return (
    <div>
      <AuthContextProvider>
        <AppRouter />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AuthContextProvider>
    </div>
  );
};

export default App;
