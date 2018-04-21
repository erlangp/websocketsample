'use strict';

var http = require('http');
var express = require('express');
var WebSocket = require('ws');
var path = require('path');

var PORT = process.env.PORT || 3000;
var INDEX = path.join(__dirname, 'index.html');

var app = express();
app.get('/', (req, res) => {
    res.send('root. Hello World!' + ' :' + PORT);
});
app.get('/api', (req, res) => {
    wss.clients.forEach((client) => {
        client.send(JSON.stringify(client));
//        client.send(client, 'Amazing ' + new Date().toTimeString());
    });
    res.send('api. Hello World!' + ' :' + PORT);
});
// app.listen(PORT, function () {
  // console.log('App Ready!');
// });

var server = http.createServer(app);

var wss = new WebSocket.Server({
    server: server
});
wss.on('connection', (ws) => {
    ws.on('message', (incomingMessage) => {
        console.log('Message received: %s', incomingMessage);
    });
    ws.send('Something');
});

server.listen(PORT, () => {
    console.log('Server Ready!' + ' :' + PORT);
});
