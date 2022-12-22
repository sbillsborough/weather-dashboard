var currentDay = moment().format("(DD/MM/YYYY)");
$("#todayDate").text(currentDay);

var searchInput = $("#search-input");
var searchForm = $("#search-form");
var searchButton = $("#search-button");

var apiKey = "b4d39ba071aaf22dfaae85c01257a991";
var city = "";

var iconUrl = "https://openweathermap.org/img/w/";

function getWeatherData() {
  // city = searchInput.val();

  if (city) {
    $.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    ).then(function (currentData) {
      console.log(
        `
      Temp: ${Math.round(currentData.main.temp)}
      Wind: ${currentData.wind.speed}
      Humidity: ${currentData.main.humidity}%
      Icon URL: ${iconUrl + currentData.weather[0].icon + ".png"}
    `
      );

      $.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
      ).then(function (forecastData) {
        console.log(forecastData);
      });
    });
  }
}

// function init() {
//   searchButton.click(function () {
//     getWeatherData();
//   });
// }
// init();
getWeatherData();
