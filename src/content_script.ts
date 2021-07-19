import $ from "jquery";

window.addEventListener("load", main, false);

let currSelectedText = "";

function main() {
	console.log("content script works!");

	setInterval(function () {
		const halo = $("div.notion-selectable-halo");
		if (halo.length) {
			const x = halo.parent().find(".notranslate").text();

			// only log on change
			if (x != currSelectedText) {
				currSelectedText = x;
				console.log(x);
			}
		}
	}, 1000);
}
