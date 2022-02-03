import React from "react";
import "./serverbrowser.scss";

export default function ServerBrowser(props) {
  const rooms = props.rooms;
  return (
    <div className="server-browser">
      <h2>Server Browser</h2>
      {rooms.map((room) => {
        return (
          <article className="information card">
            <span className="tag">Host: {room.host}</span>
            <h2 className="title">{room.code}</h2>
            <p className="info">
              Elemenatary tracks all the events for the day as you scheduled and
              you will never have to worry.
            </p>
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
                <dt>Satisfaction</dt>
                <dd>100%</dd>
              </div>
              <div>
                <dt>Customers</dt>
                <dd>4.5K</dd>
              </div>
            </dl>
          </article>
        );
      })}
    </div>
  );
}
