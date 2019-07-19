require('dotenv').config();
const request = require('request');

const getOpenWeatherData = () => {
    return new Promise(function (resolve, reject) {
        let city = process.env.CITY;
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPEN_WEATHER_API}&units=metric`;
        request(url, function (error, response, body) {
            resolve(JSON.parse(body));
        })
    });
};

module.exports = {
    getWeatherData: getOpenWeatherData
};