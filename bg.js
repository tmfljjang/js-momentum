const body = document.querySelector('body');


function paintRandomImage(randomNumber) {
	const image = new Image();
	image.src = `photo/${randomNumber + 1}.jpg`
	image.classList.add('bg-image');
	body.appendChild(image);
}

function genRandom() {
	const number = Math.floor(Math.random() * 4);
	return number;
}


function init() {
	const randomNumber = genRandom();
	paintRandomImage(randomNumber);
}

init();