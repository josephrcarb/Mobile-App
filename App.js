import React, { Component, useState, useEffect } from 'react';
import Navigator from './routes/homeStack';
import UserContext from "./context/UserContext";
import Axios from "axios";

export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async (e) => {
      let token = localStorage.getItem("auth-token");
      if(token === null){
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null,
        {
          headers: { "x-auth-token": token }
        }
      );
    
      if(tokenRes.data){
        const userRes = await Axios.get("http://localhost:5000/users/", {
          headers: {"x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  return(
    <UserContext.Provider value={{userData, setUserData}}>
      <Navigator />
    </UserContext.Provider>
  );
}