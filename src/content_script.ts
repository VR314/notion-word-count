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
				console.log(countWordsAndChars(x));
			}
		}
	}, 1000);
}

type WordsAndChars = {
	words: number;
	chars: number;
};

enum states {
	OUT,
	IN,
}

function countWordsAndChars(text: string): WordsAndChars {
	text = text.trim();
	let state = states.OUT;
	let words = 0,
		chars = text.length;

	for (let c of text) {
		if (state === states.IN) {
			if (c == " ") {
				state = states.OUT;
				words++;
			}
		} else {
			if (c != " ") {
				state = states.IN;
			}
		}
	}

	// close final word
	words++;

	return {
		words,
		chars,
	};
}
