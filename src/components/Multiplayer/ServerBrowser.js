import React from "react";
import "./serverbrowser.scss";

import Carousel from "../Carousel/Carousel";

export default function ServerBrowser(props) {
  const rooms = props.rooms;
  console.log('rooms: ',rooms)
  return (
    <div className="server-browser">
      {rooms.length > 0 && <Carousel rooms={rooms} active={0} />}
      {rooms.length === 0 && 
        <h2>no rooms available</h2>
      }
    </div>
  );
}
