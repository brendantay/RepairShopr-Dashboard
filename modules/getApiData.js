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

const getRepairShoprData = () => {
    const utc = new Date().toJSON().slice(0, 10);
    const apiKey = process.env.API_KEY;
    const url = `https://irepairnow.repairshopr.com/api/v1/invoices?api_key=${apiKey}&date=${utc}`;

    return new Promise( function(resolve,reject) {
      request(url , function(error,response,body) {
        resolve(JSON.parse(body))
      })
  })
};

module.exports = {
    getWeatherData: getOpenWeatherData,
    getRepairShoprData: getRepairShoprData
};
