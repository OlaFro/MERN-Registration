import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Navbar />
      <Switch>
        {isLoggedIn ? <Route path="/" component={Home} exact /> : null}
        <Route path="/users/register" component={Register} exact />
        <Route path="/users/login" component={Login} exact />
      </Switch>
    </Router>
  );
}
