"use strict";

const map = document.querySelector("#map");
const getLocation = document.querySelector(".get__local");
const removeLocation = document.querySelector(".remove__local");

const mapHtml = (long, lat) => `<iframe
src="https://maps.google.com/maps?q=${lat}, ${long}&z=15&output=embed"
width="100%"
height="100%"
frameborder="0"
style="border: 0"
></iframe>`;

class App {
  constructor() {
    // check if user's browser supports Geolocation API
    this._getLocation();
  }

  _getLocation() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._showPosition.bind(this),
        function () {
          alert("Could not get your position");
        }
      );
    else alert("API not supported");
  }

  _showPosition(position) {
    // take lat and long geolocation
    const { longitude: long, latitude: lat } = position.coords;

    // mapping coords
    const mapping = mapHtml(long, lat);
    map.insertAdjacentHTML("afterbegin", mapping);

    // Adding longitude and latitude to localStorage
    localStorage.setItem("long", long);
    localStorage.setItem("lat", lat);
  }
}

//remove

const start = function () {
  const long = localStorage.getItem("long");
  const lat = localStorage.getItem("lat");
  if (long && lat) {
    const mapping = mapHtml(long, lat);
    map.insertAdjacentHTML("afterbegin", mapping);
    getLocation.disabled = true;
  } else {
    getLocation.addEventListener("click", function () {
      const app = new App();
    });
  }
};

// remove coords from local storage

removeLocation.addEventListener("click", function () {
  localStorage.clear();
  getLocation.disabled = false;
  start();
});

start();
