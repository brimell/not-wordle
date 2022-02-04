import React from "react";

import Carousel from "../Carousel/Carousel";

export default function ServerBrowser(props) {
  const rooms = props.rooms;
  return (
    <div className="server-browser">
      {rooms.length > 0 && <Carousel rooms={rooms} active={0} />}
      {rooms.length === 0 && 
        <h2>no rooms available</h2>
      }
    </div>
  );
}
