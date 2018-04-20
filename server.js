'use strict';

var express = require('express');
var WebSocket = require('ws');
var path = require('path');

var PORT = process.env.PORT || 3000;
var INDEX = path.join(__dirname, 'index.html');

var app = express();
app.get('/', function (req, res) {
    res.send('Root Hello World!');
});
app.get('/api', function (req, res) {
//    wss.clients.forEach((client) => {
//        client.send(new Date().toTimeString());
//    });
    res.send('API Build signal accepted!');
});
app.listen(PORT, function () {
  console.log('Ready');
});

var wss = new WebSocket.Server({httpServer: app});
wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });
    ws.send('something');
});
