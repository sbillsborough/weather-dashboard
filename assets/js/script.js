var currentDay = moment().format("(DD/MM/YYYY)");
$("#todayDate").text(currentDay);

var searchInput = $("#search-input");
var searchForm = $("#search-form");
var searchButton = $("#search-button");
var itemWrapper = $("#today");
var fiveDayWrapper = $("#forecast");
var searchHistory = JSON.parse(localStorage.getItem("city")) || [];
var historyEl = $(".history-buttons");
var historyBtn = $(".search-history");

var apiKey = "b4d39ba071aaf22dfaae85c01257a991";

var iconUrl = "https://openweathermap.org/img/w/";

historyEl.html("");

var city;

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
            Temp: ${Math.round(currentData.main.temp)} &deg;C<br>
            Wind: ${currentData.wind.speed} KPH<br>
            Humidity: ${currentData.main.humidity}%
          </p>
    `);

      $.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      ).then(function (forecastData) {
        fiveDayWrapper.html("");

        fiveDayWrapper.html(`
        <h2>5-Day Forecast:</h2>
        <div class="weather-container">
        <div class="weather-item column">
        <h3>${forecastData.list[7].dt_txt.substr(0, 10)}</h3>
        <img src="${iconUrl + forecastData.list[8].weather[0].icon + ".png"}">
        Temp: ${forecastData.list[7].main.temp} &deg;C<br>
        Wind: ${forecastData.list[7].wind.speed} KPH<br>
        Humidity: ${forecastData.list[7].main.humidity}%
        </div>

        <div class="weather-item column">
        <h3>${forecastData.list[15].dt_txt.substr(0, 10)}</h3>
        <img src="${iconUrl + forecastData.list[16].weather[0].icon + ".png"}">
        Temp: ${forecastData.list[15].main.temp} &deg;C<br>
        Wind: ${forecastData.list[15].wind.speed} KPH<br>
        Humidity: ${forecastData.list[15].main.humidity}%
        </div>

        <div class="weather-item column">
        <h3>${forecastData.list[23].dt_txt.substr(0, 10)}</h3>
        <img src="${iconUrl + forecastData.list[23].weather[0].icon + ".png"}">
        Temp: ${forecastData.list[23].main.temp} &deg;C<br>
        Wind: ${forecastData.list[23].wind.speed} KPH<br>
        Humidity: ${forecastData.list[23].main.humidity}%
        </div>

        <div class="weather-item column">
        <h3>${forecastData.list[31].dt_txt.substr(0, 10)}</h3>
        <img src="${iconUrl + forecastData.list[32].weather[0].icon + ".png"}">
        Temp: ${forecastData.list[31].main.temp} &deg;C<br>
        Wind: ${forecastData.list[31].wind.speed} KPH<br>
        Humidity: ${forecastData.list[31].main.humidity}%
        </div>

        <div class="weather-item column">
        <h3>${forecastData.list[39].dt_txt.substr(0, 10)}</h3>
        <img src="${iconUrl + forecastData.list[39].weather[0].icon + ".png"}">
        Temp: ${forecastData.list[39].main.temp} &deg;C<br>
        Wind: ${forecastData.list[39].wind.speed} KPH<br>
        Humidity: ${forecastData.list[39].main.humidity}%
        </div>
        `);
      });
    });
    if (searchHistory.indexOf(city) == -1) {
      searchHistory.push(city);

      createButtons();
    }
  }
}

function createButtons() {
  historyEl.empty();
  if (searchHistory.indexOf(city) == -1) {
    for (var i = 0; i < searchHistory.length; i++) {
      localStorage.setItem("city", JSON.stringify(searchHistory));
      var create = $("<button>");
      create.attr("type", "submit");
      create.attr("class", "search-history");
      create.text(searchHistory[i]);
      historyEl.append(create);
    }
  }
}

createButtons();

var searchBtnValue = $(".search-history");

function hist() {
  $(document).ready(function () {
    searchBtnValue.click(function (event) {
      console.log("clicked history btn");
      event.preventDefault();
      var text = $(this).text();
      searchInput.val(text);
      getWeatherData(event);
    });
  });
}

hist();

function init() {
  searchButton.click(getWeatherData);
}

init();

// Hi Scott, Excellent work on this assignment! You successfully built a dynamic web application weather dashboard powered by your JavaScript code! Great job hitting the OpenWeather API, and implementing a responsive UI to display weather data! Your deployment was successful, and your app loads without any issues. I was able to see the weather in Los Angeles, Tokyo, Thimphu, Budapest, and Timbuktu! You managed to meet all of the technical acceptance criteria for this challenge. However, you lost some points because of how the search history functions. Right now you have it set up so that every time a city is searched for, that city gets added to the end of a searchHistory array, and then that entire array is set as the search history. I recommend reaching out to your tutor, and asking them to help you fix the issues with your search history. If you aren't working with a tutor yet, request one immediately. Tutoring sessions are part of the bootcamp program, but it's up to you to request/schedule them. I went through bootcamp not long ago, and my tutor did a great job of helping me stay on track throughout the course! Everything looks great with your repo. Your codebase is well organized, and easy to follow. You have a healthy commit history, complete with descriptive commit messages, and a comprehensive README that includes all of the necessary information and links. Sweet! Keep up the good work, and happy coding! C.G. - Sean S. Grade = 95%
