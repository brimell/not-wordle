import React from "react";
import { Home, Settings, X, User, MessageSquare } from "react-feather";
import "./MainNav.scss";

import { Link } from "react-router-dom";
import $ from "jquery";

export default function MainNav(props) {
  const settings = props.settings;
  const setSettings = props.setSettings;
  const open = props.open;
  const setSeedUpdate = props.setSeedUpdate;

  return (
      <nav className="navbar">
        <ul className="navbar__menu">
          <li className="navbar__item">
              <Link
                className="navbar__link"
                to="/not-wordle/"
                id="homeButton"
                onClick={() => {
                  sessionStorage.setItem("multiplayer", "false");
                }}
              >
                <Home />
                <span>Home</span>
              </Link>
          </li>
          <li className="navbar__item">
            <a className="navbar__link">
              <MessageSquare />
              <span>Messages</span>
            </a>
          </li>
          <h1>not wordle</h1>
          <li className="navbar__item">
            <a className="navbar__link" onClick={open}>
              <User />
              <span>Stats</span>
            </a>
          </li>
          <li className="navbar__item">
            <a
              className="navbar__link"
              onClick={() => {
                setSeedUpdate(Number(sessionStorage.getItem("seed")) || false);
                setSettings((a) => !a);
              }}
            >
              {!settings ? <Settings /> : <X />}
              <span>Settings</span>
            </a>
          </li>
        </ul>
      </nav>
  );
}
