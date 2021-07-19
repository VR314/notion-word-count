import $ from "jquery";

window.addEventListener("load", main, false);

let currSelectedText = "";

function main() {
	console.log("content script works!");

	let words: number, chars: number;
	//TODO: instead of every second, run on click?
	setInterval(function () {
		const halo = $("div.notion-selectable-halo");
		if (halo.length) {
			const x = halo.parent().find(".notranslate").text();

			// only log on change
			if (x != currSelectedText) {
				currSelectedText = x;
				console.log(x);
				({ words, chars } = countWordsAndChars(currSelectedText));
			}
		}

		const leftMenuItem = $(
			"#notion-app > div > div.notion-overlay-container.notion-default-overlay-container > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(2) > div > div > div > div > div.notion-scroller.vertical > div:nth-child(2) > div"
		);
		if (leftMenuItem.length && leftMenuItem.children().children().length <= 1) {
			const leftMenuHTML = `<div style="font-size: 12px; line-height: 16px; color: rgba(255, 255, 255, 0.4); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 4px;">${words} words, ${chars} chars</div>`;
			leftMenuItem.children().prepend(leftMenuHTML);
		} else {
			const rightMenuItem = $(
				"#notion-app > div > div.notion-overlay-container.notion-default-overlay-container > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(2) > div > div > div > div > div.notion-scroller.vertical > div:nth-child(2) > div"
			);
			if (
				rightMenuItem.length &&
				rightMenuItem.children().children().length <= 1
			) {
				const rightMenuHTML = `<div style="font-size: 12px; line-height: 16px; color: rgba(255, 255, 255, 0.4); margin-bottom: 4px;">${words} words, ${chars} chars</div>`;
				rightMenuItem.children().prepend(rightMenuHTML);
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
