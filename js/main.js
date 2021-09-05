const city = document.querySelector(".weather-city h1");
const weatherDescription = document.querySelector(".weather-city p");
const temp = document.querySelector(".weather-temp span");
const feelsLike = document.getElementById("feels-like");
let icon = document.getElementById("weather-icon");
const searchForm = document.getElementById("search-form");
const input = document.querySelector("#search-form > input");

const day = document.querySelector(".day");
const month = document.querySelector(".month");
const currentTime = document.querySelector(".hour");
const minute = document.querySelector(".minute");

// time

const time = new Date();

currentTime.innerHTML = time.getHours();
minute.innerHTML = time.getMinutes();

if (time.getHours() > 12) {
  document.querySelector(".period").innerHTML = "PM";
} else {
  document.querySelector(".period").innerHTML = "AM";
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

document.querySelector(".month").innerHTML = monthNames[time.getMonth()];

var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

document.querySelector(".day").innerHTML = days[time.getDay()];

var inputValue;

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  inputValue = input.value;
});

// console.log(inputValue);

window.addEventListener("load", () => {
  let long;
  let lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const cityName = "almora";
      const apiKey = "e98838cd640817b8a0aa8c6c63beb703";
      const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
      const apiURLForcast = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely,hourly&appid=${apiKey}&units=metric`;

      fetch(apiURL)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const { coords, weather, main, name } = data;

          const temperature = (main.temp - 273).toFixed(2);
          const feels_like = (main.feels_like - 273).toFixed(2);

          weatherDescription.innerHTML = weather[0].description;
          city.innerHTML = name;
          temp.innerHTML = `${temperature}`;
          console.log(weather[0].icon);
          const iconImg = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;
          icon.src = iconImg;
          // icon.src = 'animated/day.svg'

          feelsLike.innerHTML = feels_like;
        });

      fetch(apiURLForcast)
        .then((response1) => {
          return response1.json();
        })
        .then((data1) => {
          console.log(data1);
          const { current, daily } = data1;

          document.querySelector(
            ".weather-icon1"
          ).src = `https://openweathermap.org/img/wn/${daily[0].weather[0]["icon"]}@2x.png`;

          document.querySelector(
            ".current-temp-day1"
          ).innerHTML = `day : ${daily[0].temp.day} &#8451;`;

          document.querySelector(
            ".current-temp-night1"
          ).innerHTML = `night : ${daily[0].temp.night} &#8451;`;

          document.querySelector(
            ".weather-description1"
          ).innerHTML = `${daily[0].weather[0].description}`;

          // second card

          document.querySelector(
            ".weather-icon2"
          ).src = `https://openweathermap.org/img/wn/${daily[1].weather[0]["icon"]}@2x.png`;

          document.querySelector(
            ".current-temp-day2"
          ).innerHTML = `day : ${daily[1].temp.day} &#8451;`;

          document.querySelector(
            ".current-temp-night2"
          ).innerHTML = `night : ${daily[1].temp.night} &#8451;`;

          document.querySelector(
            ".weather-description2"
          ).innerHTML = `${daily[1].weather[0].description}`;

          // third card

          document.querySelector(
            ".weather-icon3"
          ).src = `https://openweathermap.org/img/wn/${daily[2].weather[0]["icon"]}@2x.png`;

          document.querySelector(
            ".current-temp-day3"
          ).innerHTML = `day : ${daily[2].temp.day} &#8451;`;

          document.querySelector(
            ".current-temp-night3"
          ).innerHTML = `night : ${daily[2].temp.night} &#8451;`;

          document.querySelector(
            ".weather-description3"
          ).innerHTML = `${daily[2].weather[0].description}`;

        });

      // const temp = data;
      // console.log(temp);
    });
  }
});
