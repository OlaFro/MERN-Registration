import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

let style = {
  display: "flex",
  flexDirection: "column",
  width: "40%",
  margin: "auto",
};
let center = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export default function Login() {
  const [loginData, setLoginData] = useState({
    login: "",
    password: "",
  });
  const [res, setRes] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState("false");

  function handleLogin(e) {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  }

  function logInUser(e) {
    e.preventDefault();
    axios
      .post("/users/login", loginData)
      .then((res) => {
        setRes(res.data.msg);
        setIsLoggedIn(res.data.session);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div style={center}>
      <h2>Are you already registered? Log in!</h2>
      <form style={style} onSubmit={logInUser}>
        <label htmlFor="name">Username</label>
        <input type="text" name="name" onChange={handleLogin} />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" onChange={handleLogin} />
        <input type="submit" value="log in" />
      </form>
      {res ? (
        <>
          <p>{res}</p>{" "}
          <p>
            {" "}
            You can now visit{" "}
            <Link to="/" exact>
              Home
            </Link>
          </p>
        </>
      ) : null}
    </div>
  );
}
