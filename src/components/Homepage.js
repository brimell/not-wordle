import React from "react";
import { Link } from "react-router-dom";
import { Button } from '@mui/material';

export default function Homepage() {
  return (
    <div className="homepage">
      <Link to="/not-wordle/multiplayer" className="link">
        <Button variant="contained" onClick={() => {
          sessionStorage.setItem('multiplayer', 'true');
        }}>Multiplayer</Button>
      </Link>
      <Link to="/not-wordle/game" className="link">
        <Button variant="contained">Singleplayer</Button>
      </Link>
    </div>
  );
}
