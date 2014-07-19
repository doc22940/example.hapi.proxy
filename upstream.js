var WebSocketServer = require('ws').Server;

var wss = new WebSocketServer({port: 8080}, function() {
    console.log('Listening for Websocket connections.');
    console.log(wss._server.address());
});

wss.on('connection', function(ws) {
    console.log('Connected.');

    ws.on('message', function(message) {
        console.log('received: %s', message);
        ws.send(message);
    });

    ws.send('Hellow.');
});