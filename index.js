require('dotenv').config();
const storage = require('./modules/storage.js');
const apiRequest = require('./modules/getApiData.js');
const express = require('express');
const socket = require('socket.io');
const scheduler = require('node-schedule');

const app = express();
const port = process.env.PORT || 3000;
const s = scheduler;
const clients = [];

const server = app.listen(port, function() {
  console.log('[SERVER]: Started on port: ' + port);
});

app.use(express.static('public'));

const io = socket(server);

io.on('connection', function(socket) {
  console.log('[SERVER]: User connected');
  clients.push(socket);
  io.emit('clients', clients.length);
  if (clients.length <= 1) {
    run();
  }
  emitData();

  socket.on('disconnect', function() {
    console.log('[SERVER]: User disconnected');
    const i = clients.indexOf(socket);
    clients.splice(i, 1);
    stop();
    io.emit('clients', clients.length);
  });
});

function emitData() {
  let x = storage.getInvoiceData();
  storage.getWeatherData().then(function(val) {
    io.emit('weather', val);
  });
  io.emit('invoiceCount', x[0].length);
  io.emit('invoice', x[0].subtotal);
  io.emit('utc', x[0].utc);
}

function stop() {
  if (clients.length === 0) {
    const cronJob = s.scheduledJobs['cron'];
    cronJob.cancel();
    console.log('[SERVER]: Stopping scheduler');
  }
}

function run() {
  console.log('[SERVER]: Running scheduler');
  s.scheduleJob('cron', '*/1 * * * *', function() {
    console.log('[CRON_JOB]: getting the current schedule)');
    setData();
  });
}

function setData() {
  io.emit('loading');

  apiRequest.getRepairShoprData().then(function(val) {
    storage.storeInvoiceData(val);
  });

  apiRequest.getWeatherData().then(function(val) {
    storage.storeWeatherData(val);
  });
  emitData();
}
