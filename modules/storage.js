const mongoose = require('mongoose');
const InvoiceItem = require('../models/invoice.js');
const WeatherItem = require('../models/weather.js');


let invoiceLenght = 0;
let subtotal = 0;

mongoose.connect('mongodb://localhost:27017/invoice', {useNewUrlParser: true});

const storeInvoiceData = (body) =>{
  for (let i = 0; i < body.invoices.length - 1; i++) {
    const invoiceItem = new InvoiceItem({
      id: body.invoices[i].id,
      invoiceId: body.invoices[i]['number'],
      customer_business_then_name:
                body.invoices[i]['customer_business_then_name'],
      subtotal: body.invoices[i]['subtotal'],
      created_at: body.invoices[i]['created_at'],
      date: body.invoices[i]['date'],
    });
    invoiceItem.save().then((result) => {
      // console.log(result)
    }).catch((err) => {
      console.log(err);
    });
  }
};

const getInvoiceData = () =>{
  const utc = new Date().toJSON().slice(0, 10);
  InvoiceItem.find({date: {$gte: utc}}).exec().then((invoices) => {
    subtotal = 0;
    invoiceLenght = invoices.length;
    for (let i = 0; i < invoices.length; i++) {
      const x = parseFloat(invoices[i]['subtotal']);
      subtotal += Math.round(x * 100);
    }
  });
  return {
    length: invoiceLenght,
    subtotal: subtotal /100,
    utc: utc,
  };
};

const storeWeatherData = (data) => {
    console.log(data);
    const weatherItem = new WeatherItem({
        temp:data.temp,
        code:data.code,
        city:data.city
    });
    weatherItem.save().then((result) => {
      //console.log(result)
    }).catch((err) =>{
      console.log(err)
    });
};

module.exports = {
    storeWeatherData: storeWeatherData,
    storeInvoiceData: storeInvoiceData,
    getInvoiceData: getInvoiceData,
};
