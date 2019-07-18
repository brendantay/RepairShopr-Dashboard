let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const WeatherItem = new Schema({
    temp: String,
    code: String,
    city: String,
});

module.exports = mongoose.model("WeatherItem", WeatherItem);