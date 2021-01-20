import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

let style = {
  display: "flex",
  flexDirection: "column",
  margin: "auto",
  alignItems: "center",
};

let circle = {
  width: "4rem",
  height: "4rem",
  margin: "1rem auto",
  borderRadius: "50%",
  backgroundColor: "blue",
  cursor: "pointer",
};

let center = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export default function Register() {
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState([]);
  const [response, setResponse] = useState(false);

  localStorage.setItem("username", userData.name);
  let localName = localStorage.getItem("username");

  function userDataHandler(e) {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }
  function previewHandler(e) {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  }

  function registerUser(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append("file", image.raw, image.raw.name);
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("confirmPassword", userData.confirmPassword);

    axios
      .post("/users/register", formData)
      .then((res) => {
        setError(res.data.errors);
        setResponse(true);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div style={center}>
      <h1>Please register yourself</h1>
      <form
        style={style}
        onSubmit={registerUser}
        encType="multipart/form-formData"
      >
        {image.preview !== "" ? (
          <label htmlFor="picture">
            <img src={image.preview} alt="avatar" style={circle} />
          </label>
        ) : (
          <label htmlFor="picture">
            Upload Picture
            <div style={circle}></div>
          </label>
        )}
        <input
          type="file"
          name="userImg"
          style={{ display: "none" }}
          id="picture"
          onChange={previewHandler}
        />

        <label htmlFor="name">Username</label>
        <input type="text" name="name" onChange={userDataHandler} />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" onChange={userDataHandler} />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" onChange={userDataHandler} />
        <label htmlFor="confirmPassword">Repeat your password</label>
        <input
          type="password"
          name="confirmPassword"
          onChange={userDataHandler}
        />
        <input type="submit" value="register" />
      </form>
      {error ? error.map((elem) => <p key={elem.msg}>{elem.msg}</p>) : null}
      {response && !error ? (
        <>
          <p>You registered successfully, {localName}</p>
          <p>
            Now just please{" "}
            <Link to="/users/login" exact>
              log in
            </Link>
          </p>
        </>
      ) : null}
    </div>
  );
}
