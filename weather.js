const TEMP = document.querySelector('.weather-temp');
const CITY = document.querySelector('.weather-city');
const COORDS = 'coords';
const API_KEY = 'b7e0ab9055d5c7efd6d7247ec86f273a';

function getWeather(lat, lon) {
	fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`).
	then(function(response){
		return response.json();
	}).then(function(json){
		const temp = json.main.temp;
		const city = json.name;
		TEMP.innerText = '💜' + temp;
		CITY.innerText = '🚩' + city;
	})
}

function saveCoords(coordsObj) {
	localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleSuccess(pos) {
	const coords = pos.coords;
	const latitude = coords.latitude;
	const longitude = coords.longitude;
	const coordsObj = {
		latitude,
		longitude
	};
	saveCoords(coordsObj);
	getWeather(latitude, longitude);
}

function handleError() {
	console.log('failed');
}

function askForCoords() {
	navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
}

function loadCoords() {
	const loadedCoords = localStorage.getItem(COORDS);
	if (loadedCoords == null){
		askForCoords();
	} else{
		const parsedCoords = JSON.parse(loadedCoords);
		getWeather(parsedCoords.latitude, parsedCoords.longitude);
	}
}

function init() {
	loadCoords();
}

init();