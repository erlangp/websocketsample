'use strict';

const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
const wss = new SocketServer({ server });

server.get('/', (req, res) => {
    res.send('Hello World!');
});

server.get('/api', (req, res) => {
	wss.clients.forEach((client) => {
		client.send(new Date().toTimeString());
    });
	res.send('Build signal accepted!');
});

setInterval(() => {
    wss.clients.forEach((client) => {
        client.send(new Date().toTimeString());
    });
}, 1000);

server.listen(PORT, () => console.log(`Listening on ${ PORT }`));

wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('close', () => console.log('Client disconnected'));
});
