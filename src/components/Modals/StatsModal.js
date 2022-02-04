import React from "react";
import "react-hooks-use-modal";
import CloseIcon from "@mui/icons-material/Close";

export default function StatsModal(props) {
  const Modal = props.modal;
  const close = props.close;
  var stats =
    JSON.parse(localStorage.getItem("stats") || "{}") || "No Stats Yet...";
  var wordLength = localStorage.getItem("wordLength");
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
        <CloseIcon onClick={close} className="modalCloseIcon" />
        <h1 className="statsHeader">Stats</h1>
        <p>{"total games: " + totalgames}</p>
        <p>{"total wins: " + totalwins}</p>
        <p>{"total losses: " + totallosses}</p>
        <p>{"average guesses: " + averageGuesses}</p>
        <br />
        <h1 className="statsHeader">{wordLength + " Letter Stats"}</h1>
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
