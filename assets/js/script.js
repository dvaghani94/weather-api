var APIKey = "21cba60e15016db1b7dc111b9a568389";

var searchCity = "";
var date = new Date();
var lat = "";
var lon = "";
var search = [];

    function searchHistory() {
        search = []
        var prevSearch = localStorage.getItem("prevSearch")
            if (prevSearch !== null) {
                for (var i = 0; i < prevSearch.length; i++) {
                    var pastSearch = prevSearch.split(",").reverse()
                    console.log(pastSearch)

                    if (i < 3 && pastSearch[i] !== undefined) {
                        var history = $("<div class='list' city=" + pastSearch[i].replace("","-") + ">" + pastSearch[i] + "</div>")
                        $(".search-history").append(history)
                        search(pastSearch[i])
                    }
                }
            }
    }

    function weather() {
        navigator.geolocation.getCurrentPosition(function (position) {
            lat = position.coords.latitude;
            lon = position.coords.longitude;

        var uvQuery = "https://api.openweathermap.org/data/weather?lat=" + lat + "&lon" + lon + "&appid=" + APIKey;
        fetch(uvQuery)
        .then((res) => {
            return res.json();
    })

    //     })
    // }
    // var cityName = $("#city-name").val();
    // searchCity = $("#city-name").val();
    // var query = "https://api.openweathermap.org/data/2.5/weather?=" + cityName + "&units=imperial" + "&appid=" + APIKey;
    // fetch(query)
    // .then((res) => {
    //     return res.json();
    // })
    // .then((res) => {
    //     saveSearch(cityName);
    //     renderCity();
    //     getForecast(e);
    //     $("#city").text(res.name);
    //     var currentWeather = `<h3>${res.name} ${currentDay.format("(MM/DD/YY)")}<img src="${weatherImg}"></img></h3>;
    //         <ul class="list-unstyled">
    //             <li>Temperature: ${res.main.temp}&#8457;</li>
    //             <li>Wind Speed: ${res.wind.speed}mph</li>
    //             <li>Humidity: ${res.main.humidity}%</li>
    //             <li id="uvInd">UV Index:</li>
    //         </ul> `;
            $("current-weather").html(currentWeather);
            var lat = res.coord.lat;
            var lon = res.coord.lon;
            var uvQuery = "api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon" + lon + "&APPID=" + APIKey;
            uvQuery = "https://cors-anywhere.herokuapp.com" + uvQuery;
            fetch(uvQuery)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                var uvIndex = res.value;
                $("#uvInd").html(`UV Index: <span id="uv"> ${uvIndex}</span>`);
                if (uvIndex >= 0 && uvIndex < 3) {
                    $("#uv").attr("class", "uv-fav");
                } else if (uvIndex >= 3 && uvIndex < 8) {
                    $("#uv").attr("class", "uv-mod");
                } else if (uvIndex >= 8) {
                    $("#uv").attr("class", "uv-sev");
                }
            })

        var weatherImg = "https://openweathermap.org/img/w/" + res.weather[0].icon + ".png";

        var currentTime = res.dt;
        var currentZone = res.timezone;
        var currentHours = currentZone / 60 /60;
        var currentDay = moment.unix(currentTime).utc().utcOffset(currentHours);

    })
}

var getForecast = (e) => {
    fiveDayForecast += `</div>`;
    $("#five-day").html(fiveDayForecast);

    var cityName = $("#city-name").val();
    var query = "https://api.openweathermap.org/data/2.5/weather?=" + cityName + "&appid=" + APIKey;
    fetch(query)
    .then((res) => {
        return res.json();
    })
    .then((res) => {
        var fiveDayForecast = `<h2>5 Day Forecast:</h2>
        <div id="five-day" class="d-inline-flex flex-wrap ">`;
        for (var i = 0; i<res.list.length; i++) {
            var day = res.list[i];
            var currentTime = day.dt;
            var currentZone = res.cityName.timezone;
            var currentHours = currentZone / 60 /60;
            var currentDay = moment.unix(currentTime).utc().utcOffset(currentHours);

            var weatherImg = "https://openweathermap.org/img/w/" + day.weather[0].icon + ".png";
            if (currentDay.format("HH:mm:ss") === "11:00:00" || currentDay.format("HH:mm:ss") === "12:00:00" || currentDay.format("HH:mm:ss") === "13:00:00") {
                fiveDayForecast +=`
                <div class="weather-card m-2 card p0">
                    <ul class="list-unstyled p-3">
                        <li>${currentDay.format("MM/DD/YY")}</li>
                        <li>Temp: ${day.main.temp}&#8457;</li>
                        <br>
                        <li>Humidity: ${day.main.humidity}%</li>
                    </ul> 
                </div>` ;
            }
        }

    })
}

var saveCity = (newCity) => {
    var citySearched = false;
    for (var i = 0; i < localStorage.length; i++) {
        if (localStorage["cities" + i] === newCity) {
            citySearched = true;
            break;
        }
    }
    if (citySearched === false) {
        localStorage.setItem("cities" + localStorage.length, newCity);
    }
}

var render = () => {
    $("#results").empty();
    if(localStorage.length === 0) {
        if (searchHistory) {
            $("city-name").attr("value", searchHistory);
        } else {
            $("city-name").attr("value", "Edison");
        }
    } else {
        var lastSearch = "cities" + (localStorage.length -1);
        searchHistory = localStorage.getItem(lastSearch);
        $("city-name").attr("value", searchHistory);

        for(var i = 0; i < localStorage.length; i++) {
            var city = localStorage.getItem("cities" + i);
            var cityEl;
            if (searchCity === "") {
                searchCity = searchHistory;
            }
            if (city === searchCity) {
                cityEl = `<button type="button" class="list-group-item list-group-item-action active">${city}</button></li>`;
            } else {
                cityEl = `<button type="button" class="list-group-item list-group-item-action">${city}</button></li>`
            }
            $("results").prepend(cityEl);
        }
        if (localStorage.length > 0) {
            $("#clear").html($(`<a id="clear" href="#">clear</a>`));
        } else {
            $("#clear").html("");
        }
    }
}

$("search-btn").on("click", (e) => {
    event.preventDefault();
    searchCity = $("#city-name").val();
    currentForecast(e);
});

$("results").on("click", (e) => {
    event.preventDefault();
    $("#city-name").val(e.target.textContent);
    searchCity = $("#city-name").val();
    currentForecast(e);
});

$("#clear").on("click", (e) => {
    localStorage.clear();
    render();
});

render();

// currentForecast();