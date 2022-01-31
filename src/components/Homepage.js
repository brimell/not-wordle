import React from "react";
import { Link } from "react-router-dom";
import { Button } from '@mui/material';

export default function Homepage() {
  return (
    <div className="homepage">
      <Link to="/not-wordle/multiplayer" className="link">
        <Button variant="contained">Multiplayer</Button>
      </Link>
      <Link to="/not-wordle/game" className="link">
        <Button variant="contained">Normal</Button>
      </Link>
    </div>
  );
}
