require('dotenv').config();
const request = require('request');

const getOpenWeatherData = () => {
    let city = process.env.CITY;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPEN_WEATHER_API}&units=metric`;
    request(url, function (error, response, body) {
        try {
            let weatherData = JSON.parse(body);
            return {
                temp: Math.round(weatherData["main"]["temp"]),
                code: weatherData.weather[0].id,
                city: weatherData.name
            }

        } catch (e) {
            console.log("[SERVER]: weather api error:" + e);
            return {};
        }
    });
};

module.exports = {
    getWeatherData: getOpenWeatherData
};

