import React from "react";
import "./serverbrowser.scss";

export default function ServerBrowser(props) {
  const rooms = props.rooms;
  return (
    <div className="server-browser">
      {rooms.map((room,i) => {
        return (
          <article key={i} className="information card">
            <span className="tag">Host: {room.host}</span>
            <h2 className="title">{room.room}</h2>
            {room.users.map((user,j) => {
              return <p key={j} className="info">{user}</p>;
            })}
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
                <dd>{room.users.length}</dd>
              </div>
              <div>
                <dt>Game State</dt>
                <dd>{room.gameState}</dd>
              </div>
            </dl>
          </article>
        );
      })}
    </div>
  );
}
