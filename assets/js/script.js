

$(document).ready(function(){
    var APIKey = "21cba60e15016db1b7dc111b9a568389";

    var userInput = document.getElementById("city-name")
    var searchCity = document.getElementById("search-btn");
    var userSearch = document.getElementById("city");
    var cityTemp = document.getElementById("temperature");
    var cityHumidity = document.getElementById("humidity");
    var cityWindSpeed = document.getElementById("wind-speed");
    var cityUVIndex = document.getElementById("uv-index");
    var weatherPic = document.getElementById("weather-pic");
    var cityHistory = document.getElementById("history");
    var searchStorage = JSON.parse(localStorage.getItem("search")) || [];
            console.log(localStorage)
    
    searchCity.addEventListener("click", function(event) {
        event.preventDefault();
        console.log("working");
        var userCityName = userInput.value;
        getWeather(userCityName);
        console.log(userCityName);
    
        // localStorage.setItem("search", JSON.stringify(searchStorage));
        recallSearchStorage();
    })
    
    // Grabs the weather (API)
function getWeather(userCityName) {
        // http://api.openweathermap.org/data/2.5/weather?q=Miami&units=imperial&appid=21cba60e15016db1b7dc111b9a568389
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + userCityName + "&units=imperial"+ "&appid=" + APIKey )
            .then(response => response.json())
            .then((data) => {
            console.log(data)

            //clear out the informatin within the current page (HTML)
                $("#theContent").empty();


            // place needed data inside variable for later use
                var title = $("<h3>").addClass("the-title").text(data.name)
                var wind = $("<p>").addClass("card-text").text(data.wind.speed)
               // cityHumidity = "Humidity: " + response.data.main.humidity + "%";
                var theTemp = $("<p>").addClass("card-text").text(data.main.temp)

                var body = $("<div>").addClass("card-body")
           //merge the data to your page (HTML)
        body.append(title, wind, theTemp)
                $("#theContent").append(body)




            // var weatherImage = response.data.weather[0].icon;
            // weatherPic.setAttribute("src", "http://openweathermap.org/img/wn/" + weatherImage + "@2x.png");
            // weatherPic.setAttribute("alt", response.data.weather[0].description);
    
            // var currentDate = new Date(response.data.dt*1000);
            // var currentDay = currentDate.getDate();
            // var currentMonth = currentDate.getMonth() + 1;
            // var currentYear = currentDate.getFullYear();
            //     console.log(currentDate);
            //     console.log(currentDay);
            //     console.log(currentMonth);
            //     console.log(currentYear);
    
            // userSearch.innerHTML = response.data.name + " (" + currentMonth + "/" + currentDay + "/" + currentYear + ") ";
            // cityTemp.innerHTML = "Temperature: " + k2f(response.data.main.temp) + " &#176";
           
            // cityWindSpeed = "Wind Speed: " + response.data.main.wind.speed + "MPH";
    
    
       
        });
        
        function k2f(K) {
            return Math.floor((K - 273.15) * 1.8 + 32);
        }
    }
    
    

// Grabs the UV index

function currentUVIndex(ln,lt) {
    var UVIndexURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat= " + lt + "&lon " + ln;
       fetch(UVIndexURL)
       .then(response => response.json())
       .then((data) => {
        console.log(response)
            var currentUVIndex = document.createElement("span");
            currentUVIndex.setAttribute("class", "badge badge-danger");
            currentUVIndex.innerHTML = response.data[0].value;
            cityUVIndex.innerHTML = "UV Index: ";
            cityUVIndex.append(currentUVIndex);
        });
}

// Grabs the forcast
function grabsForecast(){
    var cityID = response.data.id;
    var weatherForecastURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIKey;
        fetch(weatherForecastURL)
        .then(response => response.json())
        .then((data) => {
            var weatherForecast = document.querySelectorAll(".forecast");
            for (i=0; i < weatherForecast.length; i++) {
                weatherForecast[i].innerHTML = "";

            var forecastIndex = i*8 + 4;
            var weatherForecastDate = new Date(response.data.list[forecastIndex].dt * 1000);
            var weatherForecastDay = weatherForecastDate.getDate();
            var weatherForecastMonth = weatherForecastDate.getMonth() + 1;
            var weatherForecastYear = weatherForecastDate.getFullYear();
            var dateForecast = document.createElement("p");
            var weatherForecast = document.createElement("img");
            var tempForecast = document.createElement("p");
            var humidityForecast = document.createElement("p");

            dateForecast.setAttribute("class", "mt-3 mb-0 forecast-date");
            dateForecast.innerHTML = weatherForecastMonth + "/" + weatherForecastDay + "/" + weatherForecastYear;
            
            weatherForecast.setAttribute("src", "https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
            weatherForecast.setAttribute("alt", response.data.list[forecastIndex].weather[0].description);

            tempForecast.innerHTML = "Temperature: " + k2f(response.data.list[forecastIndex].main.temp) + " &#176";

            humidityForecast.innerHTML = "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";

            weatherForecast[i].append(dateForecast);
            weatherForecast[i].append(weatherForecast);
            weatherForecast[i].append(tempForecast);
            weatherForecast[i].append(humidityForecast);


            console.log(response);
            }
        })
}
  

// Stores data
recallSearchStorage();
        if (searchStorage.length > 0) {
            getWeather(searchStorage[searchStorage.length - 1]);
        }
    
     function recallSearchStorage() {
         for (var i = 0; i < searchStorage.length; i++) {
             var searchHistory = document.createElement("input");
             searchHistory.setAttribute("type","text");
             searchHistory.setAttribute("value", searchStorage[i]);
             searchHistory.setAttribute("class", "form-control d-block bg-white");
             searchHistory.setAttribute("readonly", true);
             searchHistory.addEventListener("click", function() {
                 getWeather(searchHistory.value);
             })
    
             cityHistory.append(searchHistory);
            }
        }
})