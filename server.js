'use strict';

var http = require('http');
var express = require('express');
var WebSocket = require('ws');
var path = require('path');

var PORT = process.env.PORT || 3000;
var INDEX = path.join(__dirname, 'index.html');

var app = express();
app.get('/', (req, res) => {
    res.send('Root' + ' :' + PORT);
});
app.get('/api/do-build', (req, res) => {
    try {
        if (wss) {
            if (wss.clients) {
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({
                            code: "DO_BUILD", 
                            time: new Date().toTimeString()
                        }));
                    }
                });
            }
        }
    } catch (er) {
        //
    }
    res.send('Api Build' + ' :' + PORT);
});
//app.listen(PORT, function () {
//    console.log('App Ready!');
//});

var server = http.createServer(app);

var wss = new WebSocket.Server({
    server: server
});
wss.on('connection', (ws) => {
    console.log('onConnected: ');
    
    ws.on('open', () => {
        console.log('onOpen: ');
    });
    
    ws.on('message', (message) => {
        console.log('onMessage: incomingMessage=%s', message);
    });
    
    ws.on('close', () => {
        console.log('onClose: ');
    });

    ws.send('Something', (error) => {
        console.log('onSendError: ');
    });
});

server.listen(PORT, () => {
    console.log('Server Ready!' + ' :' + PORT);
});
