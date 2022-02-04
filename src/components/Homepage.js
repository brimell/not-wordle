import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export default function Homepage() {
  window.addEventListener("load", () => {
    const left = document.querySelector(".left");
    const right = document.querySelector(".right");
    const container = document.querySelector(".homepage");

    left.addEventListener("mouseenter", () => {
      container.classList.add("hover-left");
    });

    left.addEventListener("mouseleave", () => {
      container.classList.remove("hover-left");
    });

    right.addEventListener("mouseenter", () => {
      container.classList.add("hover-right");
    });

    right.addEventListener("mouseleave", () => {
      container.classList.remove("hover-right");
    });
  });

  return (
    <div className="homepage">
      <div className="split left">
        <Link to="/multiplayer" className="link">
          <button
            className="multiplayer-btn"
            onClick={() => {
              sessionStorage.setItem("multiplayer", "true");
            }}
          >
            Multiplayer
          </button>
        </Link>
      </div>

      <div className="split right">
        <Link to="/game" className="link">
          <button className="singleplayer-btn" >Singleplayer</button>
        </Link>
      </div>
    </div>
  );
}
