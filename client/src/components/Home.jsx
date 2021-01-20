import React from "react";

let center = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export default function Home() {
  if (localStorage.getItem("session")) {
    return (
      <div style={center}>
        <h1>Welcome to my app</h1>
        <h2>You can be here as long as express-session is not closed</h2>
      </div>
    );
  } else {
    return <p>please log in first</p>;
  }
}
