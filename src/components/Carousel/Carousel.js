import React, { useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "./carousel.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";

SwiperCore.use([Navigation, Pagination]);

export default function Carousel(props) {
  const rooms = props.rooms;
  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="mySwiper"
      navigation
    >
      {rooms.map((room, i) => {
        return <Item key={`slide-${i}`} room={room} />;
      })}
    </Swiper>
  );
}

function Item(props) {
  var room = props.room;
  return (
    <SwiperSlide>
      <article className="information card">
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
    </SwiperSlide>
  );
}
