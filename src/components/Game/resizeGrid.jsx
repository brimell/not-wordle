import $ from "jquery";

export function resizeGrid() {
	if (window.screen.width <= 800) {
		if (parseInt(localStorage.getItem("wordLength")) <= 5) {
			$(".Row-letter").attr("style", "width: 7vh");
		} else if (localStorage.getItem("wordLength") === "6") {
			$(".Row-letter").attr("style", "width: 6.8vh");
		} else if (localStorage.getItem("wordLength") === "7") {
			$(".Row-letter").attr("style", "width: 5.7vh");
		} else if (localStorage.getItem("wordLength") === "8") {
			$(".Row-letter").attr("style", "width: 5vh");
		}
	} else {
		setTimeout(resizeGrid, 100);
	}
}
