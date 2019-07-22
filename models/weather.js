let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const WeatherItem = new Schema({
    temp: String,
    desc: String,
    cod: String,
});

module.exports = mongoose.model("WeatherItem", WeatherItem);
