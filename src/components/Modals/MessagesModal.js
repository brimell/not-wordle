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
  const grids = props.grids;
  const username = props.username;

  return (
    <Modal>
      <div className="modalContainer">
        <X onClick={close} className="modalCloseIcon" />
          <div className="messagesContainer">
              messages
          </div>
      </div>
    </Modal>
  );
}
