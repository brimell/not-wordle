import React, { useEffect } from "react";
import "react-hooks-use-modal";
import { X, User } from "react-feather";
import "./StatsModal.scss";

export default function StatsModal(props) {
  const Modal = props.modal;
  const close = props.close;
  const socket = props.socket;
  const isOpen = props.isOpen;

  var stats =
    JSON.parse(localStorage.getItem("stats") || "{}") || "No Stats Yet...";
  var wordLength = socket ? 5 : localStorage.getItem("wordLength");
  var totalgames = 0;
  var totalwins = 0;
  var totallosses = 0;
  var guessesArray = [];
  for (var key in stats) {
    if (parseInt(key)) {
      totalgames += stats[key].games;
      totalwins += stats[key].wins;
      totallosses += stats[key].losses;

      for (var key2 in stats[key].guesses) {
        for (var i = 0; i < stats[key].guesses[key2]; i++) {
          guessesArray.push(key2);
        }
      }
    }
  }

  // console.log(guessesArray)
  let totalGuesses = 0;
  for (let i = 0; i < guessesArray.length; i++) {
    totalGuesses += parseInt(guessesArray[i]);
  }
  var averageGuesses = Math.round(totalGuesses / guessesArray.length);
  return (
    <Modal>
      <div className="modalContainer">
        <X onClick={close} className="modalCloseIcon" />
        <div className="profile">
          <div className="profileIconContainer">
            <User className="profileIcon" />
          </div>
          <h2 className="username">
            @{localStorage.getItem("name") || "user"}
          </h2>
        </div>
        <h1 className="statsHeader">Statistics</h1>
        <div className="mainStatsContainer">
          <div className="played">
            <p>{totalgames || 0}</p>
            <span>Played</span>
          </div>
          <div className="wins">
            <p>{totalwins || 0}</p>
            <span>Wins</span>
          </div>
          <div className="streak">
            <p>{stats.streak || 0}</p>
            <span>Streak</span>
          </div>
          <div className="average">
            <p>{averageGuesses}</p>
            <span>Average Guesses</span>
          </div>
        </div>
        {stats[wordLength] && (
          <div className="distribution">
            <h1 className="statsHeader">
              {wordLength + " Letter Guess Distribution"}
            </h1>
            <div className="bar-graph">
              {Object.keys(stats[wordLength].guesses).map((key, i) => {
                return (
                  <div className="barContainer" key={i}>
                    <span className="label">{key}</span>
                    <div
                      className="bar"
                      key={i}
                      id={`bar-${key}`}
                      style={{width: `${stats[wordLength].guesses[key] / totalgames * 100}%`}}
                    ><span className="count">{stats[wordLength].guesses[key]}</span></div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
