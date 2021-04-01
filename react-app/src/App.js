import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {useDispatch} from 'react-redux'

import NavBar from "./components/navbar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/userlist/UsersList";
import User from "./components/user/User";
import Map from './components/map'
import HomePage from './components/splash_page'
import { authenticate } from "./services/auth";


// Modal stuff
import LoginFormModal from './components/loginmodal'
import SignupFormModal from './components/signupmodal'


// Styling
import c from './App.module.css'


function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const dispatch = useDispatch()

  useEffect(() => {
    (async() => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
      }
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar authenticated={authenticated} setAuthenticated={setAuthenticated} />
      <Switch>
        <Route path="/login" exact={true}>
          <div className={c.login_image_holder}>
            <img src='static/login.jpg' alt='warm' className={c.login_image}/>
          </div>
          <LoginFormModal authenticated={authenticated} setAuthenticated={setAuthenticated}/>
        </Route>
        <Route path="/sign-up" exact={true}>
          <div className={c.login_image_holder}>
            <img src='static/signup.jpg' alt='warm' className={c.login_image}/>
          </div>
          <SignupFormModal authenticated={authenticated} setAuthenticated={setAuthenticated}/>
        </Route>
        <ProtectedRoute path="/users" exact={true} authenticated={authenticated}>
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} authenticated={authenticated}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/map-test' authenticated={authenticated}>
          <Map />
        </ProtectedRoute>
        <Route path="/" exact={true} authenticated={authenticated}>
          <HomePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
