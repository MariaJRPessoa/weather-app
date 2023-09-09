function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function today() {
  let now = new Date();
  let currentDate = now.getDate();
  let currentDay = now.getDay();
  let currentYear = now.getFullYear();
  let minutes = now.getMinutes();
  let month = now.getMonth();
  let months = [
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
  let daysWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let monthName = months[month];
  let dayWeek = daysWeek[currentDay];
  let formattedTime = formatDate(now);
  let id = document.querySelector("#today");
  id.innerHTML = `${dayWeek} <br /> ${monthName} ${currentDate}, ${currentYear} <br /> ${formattedTime}`;
}

today();

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let city = searchInput.value;
  let h1 = document.querySelector("h1");
  if (searchInput.value) {
    h1.innerHTML = `${searchInput.value}`;
    weatherData(city);
  } else {
    h1.innerHTML = null;
    alert("Please type city");
  }
}

let form = document.querySelector("form");
form.addEventListener("submit", search);

function convertToFahrenheit(event) {
  event.preventDefault();
  let unitsElement = document.querySelector(".degrees");
  unitsElement.innerHTML = 64;
}

function convertToCelsius(event) {
  event.preventDefault();
  let unitsElement = document.querySelector(".degrees");
  unitsElement.innerHTML = 18;
}
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);

function weatherData(city) {
  let apiKey = "a2dda52dce059eb8a14e95aaa0db6ab7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(function (response) {
    console.log(response.data);
    showTemperature(response);
    showCity(city);
    showDescription(response);
    showHumidity(response);
    showWind(response);
  });
}
weatherData("Nijmegen");

function showTemperature(response) {
  let temperatureToday = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#degrees");
  temperatureElement.innerHTML = `${temperatureToday} °C`;
}

function showCity(city) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = city;
}

function showDescription(response) {
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
}

function showHumidity(response) {
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
}

function showWind(response) {
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `Wind: ${response.data.wind.speed} km/h`;
}
