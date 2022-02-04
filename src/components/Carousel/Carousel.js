import React, {useState} from "react";
import "./carousel.scss";
import { useSpring, animated } from 'react-spring'

export default function Carousel(props) {
    const [state, setState] = useState({
      active: props.active,
      direction: "",
    })
    const rooms = props.rooms
    var rightClick = moveRight.bind(this);
    var leftClick = moveLeft.bind(this);

  function generateItems() {
    var items = [];
    var level;
    for (var i = state.active - 2; i < state.active + 3; i++) {
      var index = i;
      if (i < 0) {
        index = rooms.length + i;
      } else if (i >= rooms.length) {
        index = i % rooms.length;
      }
      level = state.active - i;
      console.log(rooms, index, level);
      items.push(
        <Item key={index} room={rooms[index]} level={level} />
      );
    }
    return items;
  }

  function moveLeft() {
    var newActive = state.active;
    newActive--;
    setState({
      active: newActive < 0 ? rooms.length - 1 : newActive,
      direction: "left",
    });
  }

  function moveRight() {
    var newActive = state.active;
    setState({
      active: (newActive + 1) % rooms.length,
      direction: "right",
    });
  }

    const spring = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } })

    return (
      <div id="carousel" className="noselect">
        <div className="arrow arrow-left" onClick={leftClick}>
          <i className="fi-arrow-left"></i>
        </div>
          {generateItems()}
        <div className="arrow arrow-right" onClick={rightClick}>
          <i className="fi-arrow-right"></i>
        </div>
      </div>
    );
}

function Item(props) {
    const [state, setState] = useState({
      level: props.level,
    })
  render() {
    const className = "item level" + props.level;
    var room = props.room;
    if (room === undefined) {
      room = {
        host: "",
        room: "",
        users: [""],
        gameState: "",
      };
    }
    return (
        <article className={`information card ${className}`}>
          <span className="tag">Host: {room.host}</span>
          {room.users.map((user, j) => {
            <h2 className="title">{room.room}</h2>;
            return (
              <p key={j} className="info">
                {user}
              </p>
            );
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
  }
}
