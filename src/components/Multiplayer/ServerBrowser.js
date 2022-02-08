import React from "react";

import Carousel from "../Carousel/Carousel";

export default function ServerBrowser(props) {
  const rooms = props.rooms;
  const socket = props.socket;
  const name = props.name;
  const setLobby = props.setLobby;
  var tempList = []
  for (var i = 0; i < 3; i++) {
    templist.push('x')
  }
  return (
    <div className="server-browser">
      {rooms.length > 0 && (
        <Carousel
          name={name}
          setLobby={setLobby}
          rooms={rooms}
          socket={socket}
          active={0}
        />
      )}
      {rooms.length === 0 && (
        {for (var i = 0; i < 3; i++) {
          return (
            <article className="information card">
          <span className="tag">{"    "}</span>
          <h2 className="title">{"    "}</h2>
          <span className="subtitle">Players List:</span>
          {"    "}
          <button className="button">
            <span>Join Room</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="none"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M16.01 11H4v2h12.01v3L20 12l-3.99-4v3z"
                fill="currentColor"
              />
            </svg>
          </button>
          <dl className="details">
            <div>
              <dt>Players</dt>
              <dd>{"    "}</dd>
            </div>
            <div>
              <dt>State</dt>
              <dd>{"    "}</dd>
            </div>
          </dl>
        </article>
          )
        }}
        
      )}
    </div>
  );
}
