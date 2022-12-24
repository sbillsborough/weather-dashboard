var currentDay = moment().format("(DD/MM/YYYY)");
$("#todayDate").text(currentDay);

var searchInput = $("#search-input");
var searchForm = $("#search-form");
var searchButton = $("#search-button");
var itemWrapper = $("#today");

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
        console.log(forecastData.list);
        console.log(forecastData.list[0].dt_txt);
        console.log(forecastData.list[8].dt_txt);
        console.log(forecastData.list[16].dt_txt);
        console.log(forecastData.list[24].dt_txt);
        console.log(forecastData.list[32].dt_txt);
      });
    });
  }
}

function init() {
  searchButton.click(getWeatherData);
}

init();
