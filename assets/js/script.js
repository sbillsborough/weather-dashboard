var currentDay = moment().format("(DD/MM/YYYY)");
$("#todayDate").text(currentDay);

var searchInput = $("#search-input");
var searchForm = $("#search-form");
var searchButton = $("#search-button");
var itemWrapper = $("#today");
var fiveDayWrapper = $("#forecast");

var apiKey = "b4d39ba071aaf22dfaae85c01257a991";

var iconUrl = "https://openweathermap.org/img/w/";

function getWeatherData(event) {
  event.preventDefault();
  var city = searchInput.val();

  if (city) {
    $.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    ).then(function (currentData) {
      itemWrapper.html("");

      itemWrapper.html(`
          <div class="row">
            <h2 class="cityTitle">${city} ${currentDay}</h2>
            <img src="${iconUrl + currentData.weather[0].icon + ".png"}">
          </div>
          <p>
            Temp: ${Math.round(currentData.main.temp)}&deg;C<br>
            Wind: ${currentData.wind.speed} KPH<br>
            Humidity: ${currentData.main.humidity}%
          </p>
    `);

      $.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
      ).then(function (forecastData) {
        fiveDayWrapper.html("");

        fiveDayWrapper.html(`
        <h2>5-Day Forecast:</h2>
        <div class="weather-container">
        <div class="weather-item column">
        <h3>${forecastData.list[0].dt_txt.substr(0, 10)}</h3>
        Temp: ${forecastData.list[0].main.temp}<br>
        Wind: ${forecastData.list[0].wind.speed}<br>
        Humidity: ${forecastData.list[0].main.humidity}
        </div>

        <div class="weather-item column">
        <h3>${forecastData.list[8].dt_txt.substr(0, 10)}</h3>
        Temp: ${forecastData.list[8].main.temp}<br>
        Wind: ${forecastData.list[8].wind.speed}<br>
        Humidity: ${forecastData.list[8].main.humidity}
        </div>

        <div class="weather-item column">
        <h3>${forecastData.list[16].dt_txt.substr(0, 10)}</h3>
        Temp: ${forecastData.list[16].main.temp}<br>
        Wind: ${forecastData.list[16].wind.speed}<br>
        Humidity: ${forecastData.list[16].main.humidity}
        </div>

        <div class="weather-item column">
        <h3>${forecastData.list[24].dt_txt.substr(0, 10)}</h3>
        Temp: ${forecastData.list[24].main.temp}<br>
        Wind: ${forecastData.list[24].wind.speed}<br>
        Humidity: ${forecastData.list[24].main.humidity}
        </div>

        <div class="weather-item column">
        <h3>${forecastData.list[32].dt_txt.substr(0, 10)}</h3>
        Temp: ${forecastData.list[32].main.temp}<br>
        Wind: ${forecastData.list[32].wind.speed}<br>
        Humidity: ${forecastData.list[32].main.humidity}
        </div>
        `);
      });
    });
  }
}

function init() {
  searchButton.click(getWeatherData);
}

init();
