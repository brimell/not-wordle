import CloseIcon from "@mui/icons-material/Close";

export function GameFinishedModalComponent(props) {
	const { GameFinishedModal, GameFinishedClose, gameState } = props;
	return (
		<GameFinishedModal>
			<div className="modalContainer">
				<CloseIcon
					onClick={GameFinishedClose}
					className="modalCloseIcon"
				/>
				<h1 className="statsHeader">
					{gameState === "Won" ? "Well Done!" : "Nice Try!"}
				</h1>
				<p>
					{(gameState === "Won"
						? "You have just completed todays word!"
						: "Unfortunately, you have failed todays word.") +
						"You can continue playing by closing out of this popup and pressing enter."}
				</p>
			</div>
		</GameFinishedModal>
	);
}
