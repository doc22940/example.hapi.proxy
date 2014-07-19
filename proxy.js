var Hapi = require('hapi');
var httpProxy = require('http-proxy');

var server = new Hapi.Server('0.0.0.0', '8090',  {});

server.route({
    method: '*',
    path: '/{p}',
    handler: {
        proxy: {
            host: 'localhost',
            port: 8080,
            passThrough: true,
            xforward: true
        }
    }
});

wsProxy = httpProxy.createProxyServer({ target:'http://localhost:8080' });

server.pack.register({'plugin': require('good'), 'options': { 'console': ['ops', 'request', 'log', 'error'] }}, function() {
    server.start(function(err) {
        if (err) throw err;

        server.listener.on('upgrade', function(req, socket, head) {
            wsProxy.ws(req, socket, head);
        });

        console.log('Proxy started @ ' + server.info.uri);
    });
});