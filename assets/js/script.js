var day1El = $(`.day1`);


var getCurrentWeather = function(city) {
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=b41246aaa8c624213d0a82453469cba0`;

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            // console.log(response.json());
            response.json().then(function(data) {
                console.log(data);
                console.log(data.main.temp);
                console.log(data.wind.speed);
                console.log(data.main.humidity);
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
                var tempUV = document.querySelector()
                var currentUVI = data.current.uvi;
                console.log(currentUVI);
                for (i = 1; i < 6; i++) {
                    appendFutureData(data, i);
                }
            })
        }
    })
};
// API key: b41246aaa8c624213d0a82453469cba0

var appendCurrentData = function() {

}

var appendFutureData = function(data, i) {
    var dateNum = data.daily[i].dt;
    var date = moment.unix(dateNum).format(`MM/DD/YYYY`);

    var temp = data.daily[i].feels_like.day;
    var humid = data.daily[i].humidity;
    var wind = data.daily[i].wind_speed;
    
    var tempDate = document.querySelector((`#d${i}`));
    var tempTemp = document.querySelector(`#temp${i}`);
    var tempWind = document.querySelector(`#wind${i}`);
    var tempHumid = document.querySelector(`#hum${i}`);
    
    tempDate.textContent = date;
    tempTemp.textContent += `${temp} \u00B0F`;
    tempWind.textContent += `${wind} mph`;
    tempHumid.textContent += `${humid}%`;


}
