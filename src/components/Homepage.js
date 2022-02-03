import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export default function Homepage() {
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
  return (
    <div className="homepage">
      <div class="split left">
        <Link to="/not-wordle/multiplayer" className="link">
          <Button
            variant="contained"
            onClick={() => {
              sessionStorage.setItem("multiplayer", "true");
            }}
          >
            Multiplayer
          </Button>
        </Link>
      </div>

      <div class="split right">
        <Link to="/not-wordle/game" className="link">
          <Button variant="contained">Singleplayer</Button>
        </Link>
      </div>
    </div>
  );
}
