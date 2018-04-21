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
    console.log('onConnected: ');
    
    ws.on('open', () => {
        console.log('onOpen: ');
        ws.send(Date.now());
    });
    
    ws.on('message', (message) => {
        console.log('onMessage: incomingMessage= %s', message);
        ws.send(Date.now());
    });
    
    ws.on('close', () => {
        console.log('onClose: ');
        ws.send(Date.now());
    });

    ws.send('Something', (error) => {
        console.log('onSendError: ');
    });
});

server.listen(PORT, () => {
    console.log('Server Ready!' + ' :' + PORT);
});
