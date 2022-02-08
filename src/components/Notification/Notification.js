import React from "react";
import gsap from "gsap";
import "./Notification.scss";
export default function Notification(props) {
  const openNotif = props.openNotif;
  const Icon = props.Icon
  const buttons = props.buttons;

  const { to, from, set } = gsap;

  window.addEventListener("load", () => {
    const banner = document.querySelector(".banner");
    const button = banner.querySelectorAll("button");

    button.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        to(banner, {
          opacity: 0,
          y: 16,
          duration: 0.2,
        });
      });
    });
  });

  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  return (
    <div className="banner" style={{ display: openNotif ? "flex" : "none" }}>
        {Icon && <div className="banner-icon"><Icon /></div>}
      <div className="content">
        <div>
          We use cookies to personalize your site
          <br />
          experience and analyze the site traffic.
        </div>
        <div className="list">
          <button className="muted">Decline</button>
          <button>Accept</button>
        </div>
      </div>
    </div>
  );
}
