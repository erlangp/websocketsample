'use strict';

const express = require('express');
const WebSocket = require('ws');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const app = express();
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/api', (req, res) => {
//    wss.clients.forEach((client) => {
//        client.send(new Date().toTimeString());
//    });
    res.send('Build signal accepted!');
});

const wss = new WebSocket.Server();
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
  ws.send('something');
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
