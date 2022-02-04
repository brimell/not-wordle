import React from "react";
import "react-hooks-use-modal";
import CloseIcon from "@mui/icons-material/Close";

export default function CreateGameModal(props) {
  const Modal = props.modal;
  const close = props.close;

  return (
    <Modal>
      <div className="modalContainer">
        <CloseIcon onClick={close} className="modalCloseIcon" />
        <h1 className="statsHeader">Create Game</h1>
      </div>
    </Modal>
  );
}
