const API_KEY = "";
const COORDS = "coords";

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
  }
}

function init() {
  loadCoords();
}

init();
