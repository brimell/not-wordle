import React from "react";

import Carousel from "../Carousel/Carousel";

export default function ServerBrowser(props) {
  const rooms = props.rooms;
  const socket = props.socket
  const name = props.name
  const setLobby = props.setLobby
  return (
    <div className="server-browser">
      {rooms.length > 0 && <Carousel name={name} setLobby={setLobby} rooms={rooms} socket={socket} active={0} />}
      {rooms.length === 0 && 
        <h2>no rooms available</h2>
      }
    </div>
  );
}
