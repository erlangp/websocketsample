'use strict';

const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express().listen(PORT, () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));
});

server.get('/api/build/e', (req, res) => {
	res.send('Build signal accepted!');
		wss.clients.forEach((client) => {
		client.send(new Date().toTimeString());
    });
});

//setInterval(() => {
//  wss.clients.forEach((client) => {
//    client.send(new Date().toTimeString());
//  });
//}, 1000);
