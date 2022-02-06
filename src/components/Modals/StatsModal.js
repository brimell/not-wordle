import React from "react";
import "react-hooks-use-modal";
import { X, User } from "react-feather";
import "./StatsModal.css";

export default function StatsModal(props) {
  const Modal = props.modal;
  const close = props.close;
  const socket = props.socket;

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
  let sum = 0;
  for (let i = 0; i < guessesArray.length; i++) {
    sum += parseInt(guessesArray[i]);
  }
  var averageGuesses = Math.round(sum / guessesArray.length);
  return (
    <Modal>
      <div className="modalContainer">
        <X onClick={close} className="modalCloseIcon" />
        <div className="profile">
          <div className="profileIconContainer">
            <User className="profileIcon" />
          </div>
          <h2 className="username">@{localStorage.getItem("name")}</h2>
        </div>
        <h1 className="statsHeader">Statistics</h1>
        <div className="mainStatsContainer">
          <div className="played">
            <p>{totalgames}</p>
            <span>Played</span>
          </div>
          <div className="wins">
            <p>{totalwins}</p>
            <span>Wins</span>
          </div>
          <div className="losses">
            <p>{totallosses}</p>
            <span>Losses</span>
          </div>
          <div className="average">
            <p>{averageGuesses}</p>
            <span>Average Guesses</span>
          </div>
        </div>
        <h1 className="statsHeader">
          {wordLength + " word Guess Distribution"}
        </h1>
        {stats[wordLength] ? (
          <p>{"1: " + stats[wordLength].guesses["1"]}</p>
        ) : null}
        {stats[wordLength] ? (
          <p>{"2: " + stats[wordLength].guesses["2"]}</p>
        ) : null}
        {stats[wordLength] ? (
          <p>{"3: " + stats[wordLength].guesses["3"]}</p>
        ) : null}
        {stats[wordLength] ? (
          <p>{"4: " + stats[wordLength].guesses["4"]}</p>
        ) : null}
        {stats[wordLength] ? (
          <p>{"5: " + stats[wordLength].guesses["5"]}</p>
        ) : null}
        {stats[wordLength] ? (
          <p>{"6: " + stats[wordLength].guesses["6"]}</p>
        ) : null}
      </div>
    </Modal>
  );
}
