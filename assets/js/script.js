function initData() {
var APIKey = "822421a519a9e2a66b6ce042d8b26f84";

var searchCity = document.getElementById("search-btn");
var userSearch = document.getElementById("city-name");
var cityTemp = document.getElementsById("temperature");
var cityHumidity = document.getElementsById("humidity");
var cityWindSpeed = document.getElementsById("wind-speed");
var cityUVIndex = document.getElementsById("uv-index");
var searchStorage = JSON.parse(localStorage.getItem("search")) || [];
        console.log(serachStorage)

function getWeather(cityName) {
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?=" + cityName + "&appid=" + APIKey;
    $.ajax({
        url: weatherURL,
        method: "GET",
    }).then(function(response) {
        var weatherImage = response.weather[0].icon;
        var imageURL = "http://openweathermap.org/img/wn/" + weatherImage + "@2x.png";

        var currentDate = new Date(response.data.dt*1000);
        var currentDay = currentDate.getDate();
        var currentMonth = currentDate.getMonth() + 1;
        var currentYear = currentDate.getFullYear();
            console.log(currentDate);
            console.log(currentDay);
            console.log(currentMonth);
            console.log(currentYear);

        userSearch.innerHTML = response.data.name + " (" + currentMonth + "/" + currentDay + "/" + currentYear + ") ";
        cityTemp.innerHTML = "Temperature: " + k2f(response.data.main.temp) + " &#176";
        cityHumidity = "Humidity: " + response.data.main.humidity + "%";
        cityWindSpeed = "Wind Speed: " + response.data.main.wind.speed + "MPH";

        function currentUVIndex(ln,lt) {
            var UVIndexURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat= " + lt + "&lon " + ln;
                $.ajax({
                    url: UVIndexURL,
                    method: "GET"
                }).then(function(response) {

                    var currentUVIndex = document.createElement("span");
                    currentUVIndex.setAttribute("class", "badge badge-danger");
                    currentUVIndex.innerHTML = response.data[0].value;
                    cityUVIndex.innerHTML = "UV Index: ";
                    cityUVIndex.append(currentUVIndex);
                });
        }

        
    })
}
}