import React from 'react'
import $ from "jquery";

export default function Settings(props) {

    const seedUpdate = props.seedUpdate
    return (
        <div className="App-settings">
            <p>
              You can change this from a random word to having a different word
              per day using these buttons
            </p>
            <div className="settingsContainer">
              <button
                className={
                  seedUpdate
                    ? "button is-primary"
                    : "button is-primary is-outlined"
                }
                id="todaysWord"
                onClick={() => {
                  sessionStorage.setItem(
                    "seed",
                    new Date().toISOString().replace(/-/g, "").slice(0, 8)
                  );
                  localStorage.setItem("wordMode", "todaysWord");
                  $("#todaysWord").removeClass("is-outlined");
                  $("#randomWord").addClass("is-outlined");
                }}
              >
                Today's Word
              </button>
              <button
                className={
                  seedUpdate
                    ? "button is-primary is-outlined"
                    : "button is-primary"
                }
                id="randomWord"
                onClick={() => {
                  sessionStorage.setItem("seed", "0");
                  localStorage.setItem("wordMode", "randomWord");
                  $("#todaysWord").addClass("is-outlined");
                  $("#randomWord").removeClass("is-outlined");
                }}
              >
                Random Word
              </button>
            </div>
          </div>
    )
}