import React, { Component, useState, useEffect } from 'react';
import { Redirect, BrowserRouter, Switch, Route } from "react-router-dom";

import UserContext from "./context/UserContext";
import Header from './components/pages/header';
import Home from './components/pages/home';
import Login from './components/pages/login';
import Register from './components/pages/register';
import Buy from './components/pages/list';
import Sell from './components/pages/sell';
import Test from './components/pages/home';
import NotFoundPage from './components/pages/notfoundpage';
import Profile from './components/pages/profile';
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
    <BrowserRouter>
      <UserContext.Provider value={{userData, setUserData}}>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/buy' component={Buy} />
          <Route exact path='/sell' component={Sell} />
          <Route exact path='/test' component={Test} />
          <Route exact path='/profile' component={Profile} />
          <Route exact path='/404' component={NotFoundPage} />
          <Redirect to='/404'/>
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
}