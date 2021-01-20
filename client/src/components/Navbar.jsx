import React from "react";
import { Link } from "react-router-dom";

let nav = {
  display: "flex",
  justifyContent: "space-evenly",
  margin: "1rem 0",
};

export default function Navbar() {
  return (
    <div style={nav}>
      <Link exact to="/users/register">
        Register
      </Link>
      <Link exact to="/users/login">
        Login
      </Link>
      <Link exact to="/">
        Home
      </Link>
    </div>
  );
}
