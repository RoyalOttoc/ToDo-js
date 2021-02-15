const weather = document.querySelector(".js-weather");

const API_KEY = "d239258ffad20201fddd75455044ee13";
const COORDS = "coords";

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = json.current.temp;
      const splitTemp = temperature.toString().split('.')
      const place = json.timezone;
      weather.innerText = `${splitTemp[0]} degrees  @ ${place}`;
    });
}
// function saveCoords() {
//   localStorage.setItem(COORDS, JSON.stringify(coordsObj));
// }
function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude: latitude,
    longitude: longitude,
  };

  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
  //   saveCoords(coordsObj);
  getWeather(latitude, longitude);
}
function handleGeoError() {
  console.log("error");
}
function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}
function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
