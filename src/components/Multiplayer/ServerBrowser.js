import React from "react";

import Carousel from "../Carousel/Carousel";

export default function ServerBrowser(props) {
  const rooms = props.rooms;
  const socket = props.socket;
  const name = props.name;
  const setLobby = props.setLobby;
  var tempList = [];
  for (var i = 0; i < 3; i++) {
    tempList.push("x");
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
      {rooms.length === 0 &&
        tempList.map((room, i) => {
          return (
            <article className="information card" key={i}>
              <span className="tag">{"    "}</span>
              <h2 className="title">{"    "}</h2>
              <button className="button">
                <span>{"    "}</span>
              </button>
              <dl className="details">
                <div>
                  <dt>{"    "}</dt>
                  <dd>{"    "}</dd>
                </div>
                <div>
                  <dt>{"    "}</dt>
                  <dd>{"    "}</dd>
                </div>
              </dl>
            </article>
          );
        })}
    </div>
  );
}
