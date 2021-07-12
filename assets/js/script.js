var button = document.querySelector(`#btn`);
var historyUL = document.querySelector(`#history`);


var getCurrentWeather = function(city) {
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=b41246aaa8c624213d0a82453469cba0`;

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            // console.log(response.json());
            response.json().then(function(data) {
                console.log(data);
                appendCurrentData(data);
                saveSearch(city);
                var lon = data.coord.lon;
                var lat = data.coord.lat;
                getFutureWeather(lon, lat);
            })
        }
    })
};

var getFutureWeather = function(lon, lat) {
    apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=imperial&appid=b41246aaa8c624213d0a82453469cba0`

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                var tempUV = document.querySelector(`#uv`);
                // var tempSpan = document.querySelector(`.uv-span`);
                var currentUVI = data.current.uvi;
                tempUV.textContent = "UV Index: ";
                tempUV.textContent += currentUVI;
                if (currentUVI < 5) {
                    tempUV.setAttribute("class", "fav");
                } else if (5 <= tempUV < 7) {
                    tempUV.setAttribute("class", "mod");
                } else if (tempUV >= 7) {
                    tempUV.setAttribute("class", "extr");
                };

                console.log(currentUVI);
                for (i = 1; i < 6; i++) {
                    appendFutureData(data, i);
                }
            })
        }
    })
};
// API key: b41246aaa8c624213d0a82453469cba0

var appendCurrentData = function(data) {
    var name = data.name;
    var mainTemp = data.main.temp;
    var mainWind = data.wind.speed;
    var mainHumid = data.main.humidity;
    var mainIconImg = data.weather[0].icon;
    var mainIconUrl = "http://openweathermap.org/img/w/" + mainIconImg + ".png";

    $(`#wicon0`).attr('src', mainIconUrl);
    
    var nameEl = document.querySelector(`#city-name`);
    var mainTEl = document.querySelector(`#temp0`);
    var mainWEl = document.querySelector(`#wind0`);
    var mainHEl = document.querySelector(`#hum0`);

    mainTEl.textContent = `Temp: `;
    mainWEl.textContent = `Wind: `;
    mainHEl.textContent = `Humidity: `;

    nameEl.textContent = name;
    mainTEl.textContent += `${mainTemp} \u00B0F`;
    mainWEl.textContent += `${mainWind} mph`;
    mainHEl.textContent += `${mainHumid}%`;
};

var appendFutureData = function(data, i) {
    var dateNum = data.daily[i].dt;
    var date = moment.unix(dateNum).format(`MM/DD/YYYY`);

    var temp = data.daily[i].feels_like.day;
    var humid = data.daily[i].humidity;
    var wind = data.daily[i].wind_speed;
    var iconImg = data.daily[i].weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/w/" + iconImg + ".png";

    $(`#wicon${i}`).attr('src', iconUrl);
    
    var tempDate = document.querySelector((`#d${i}`));
    var tempTemp = document.querySelector(`#temp${i}`);
    var tempWind = document.querySelector(`#wind${i}`);
    var tempHumid = document.querySelector(`#hum${i}`);

    tempTemp.textContent = `Temp: `;
    tempWind.textContent = `Wind: `;
    tempHumid.textContent = `Humidity: `;
    
    tempDate.textContent = date;
    tempTemp.textContent += `${temp} \u00B0F`;
    tempWind.textContent += `${wind} mph`;
    tempHumid.textContent += `${humid}%`;

};

var historyAdd = function(searchText) {
    var newHisEl = document.createElement(`button`);
    newHisEl.setAttribute("class", "histBtn");
    var newHis = document.createTextNode(`${searchText}`);

    newHisEl.appendChild(newHis)
    historyUL.append(newHisEl);

    newHisEl.addEventListener("click", function() {
        getCurrentWeather(searchText);
    })

};
// pretty good reference for future use of localStorage :) *Dont forget to use JSON stringify and parse!*
var saveSearch = function(city) {
    var savePull = JSON.parse(localStorage.getItem("cityHist")) || [];
    for (i = 0; i < savePull.length; i++) {
        if (savePull[i].city === city) {
            return;
        } 
        // else {
        // }
    }
    savePull.push({
        city: city
    });
    historyAdd(city);
    localStorage.setItem("cityHist", JSON.stringify(savePull));
};

var loadSearch = function() {
    var saves = JSON.parse(localStorage.getItem("cityHist"));

    if (!saves) {
        return
    } else {
        for (i = 0; i < saves.length; i++) {
            historyAdd(saves[i].city);
        }
    }
}

loadSearch();

button.addEventListener("click", function() {
    var searchText = document.getElementById(`text`).value;
    getCurrentWeather(searchText);
    console.log(searchText);

    searchText = "";
});

