import React from "react";
import "./carousel.scss";
import { TransitionGroup } from "react-transition-group";

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: this.props.rooms,
      active: this.props.active,
      direction: "",
    };
    this.rightClick = this.moveRight.bind(this);
    this.leftClick = this.moveLeft.bind(this);
  }

  generateItems() {
    var items = [];
    var level;
    for (var i = this.state.active - 2; i < this.state.active + 3; i++) {
      var index = i;
      if (i < 0) {
        index = this.state.rooms.length + i;
      } else if (i >= this.state.rooms.length) {
        index = i % this.state.rooms.length;
      }
      level = this.state.active - i;
      console.log(this.state.rooms, index, level)
      items.push(
        <Item key={index} room={this.state.rooms[index]} level={level} />
      );
    }
    return items;
  }

  moveLeft() {
    var newActive = this.state.active;
    newActive--;
    this.setState({
      active: newActive < 0 ? this.state.rooms.length - 1 : newActive,
      direction: "left",
    });
  }

  moveRight() {
    var newActive = this.state.active;
    this.setState({
      active: (newActive + 1) % this.state.rooms.length,
      direction: "right",
    });
  }

  render() {
    return (
      <div id="carousel" className="noselect">
        <div className="arrow arrow-left" onClick={this.leftClick}>
          <i className="fi-arrow-left"></i>
        </div>
        <TransitionGroup transitionName={this.state.direction}>
          {this.generateItems()}
        </TransitionGroup>
        <div className="arrow arrow-right" onClick={this.rightClick}>
          <i className="fi-arrow-right"></i>
        </div>
      </div>
    );
  }
}

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      level: this.props.level,
    };
  }
  render() {
    const className = "item level" + this.props.level;
    var room = this.props.room
    if (room === undefined) {
      room = {
        host: "",
        room: "",
        users: [''],
        gameState: "",
      }
    }
    return (
      <article className={`information card ${className}`}>
        <span className="tag">Host: {room.host}</span>
        {room.users.map((user, j) => {
        <h2 className="title">{room.room}</h2>
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
