import React, { useEffect } from "react";
import $ from "jquery";

export default function Mathler() {
	useEffect(() => {
		$("body").css("transition", "2s all");
		$("body").css("background-color", "rgb(17,24,39)");
	}, []);

	return (
		<div className="quordle">
			<iframe
				id="quordleIframe"
				title="quordle"
				className="quordleIframe"
				src="https://www.quordle.com/"
				frameborder="0"
			></iframe>
		</div>
	);
}
