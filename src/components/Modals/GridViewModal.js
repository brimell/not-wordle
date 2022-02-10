import React, { useEffect } from "react";
import "react-hooks-use-modal";
import { X, ArrowLeft, ArrowRight } from "react-feather";
import $ from "jquery";
export default function StatsModal(props) {
  const Modal = props.modal;
  const close = props.close;
  const socket = props.socket;
  const isOpen = props.isOpen;
  const game = props.game;
  const podium = props.podium;
  const grids = props.grids;
  const username = props.username;

  return (
    <Modal>
      <div className="modalContainer">
        <X onClick={close} className="modalCloseIcon" />
          <div className="gridBar">
            {grids &&
              Object.keys(grids).map((name, i) => {
                if (name === username) {
                  return "";
                } else {
                  return (
                    <div className="gridItem" key={i}>
                      <span className="nameTitle">{name}</span>
                      {grids[name].map((row, j) => {
                        return (
                          <div className="gridRow" key={j}>
                            {row.map((letter, k) => {
                              return (
                                <div
                                  className={`gridLetter letter-clue-${letter.clue}`}
                                  key={k}
                                >
                                  {podium && letter.letter}
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  );
                }
              })}
          </div>
      </div>
    </Modal>
  );
}
