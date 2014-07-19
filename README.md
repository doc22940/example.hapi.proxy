# Hapi Proxy Handler + Websockets

This a simple example on how to use [node-http-proxy](https://github.com/nodejitsu/node-http-proxy) to handle websockets in a Hapi setup. Keep in my mind, that this setup bypasses the Hapi stack completely, leaving your Websocket endpoint exposed. The request doesn't go through the [Hapi Request lifecycle](http://hapijs.com/api#request-lifecycle).

## Running

1. cd to the root of this project.
2. Start the upstream Websocket server:

~~~
node upstream.js
~~~

3. Start the proxy while running the upstream:

~~~
node proxy.js
~~~

4. Start a websocket client while running both, the upstream and the proxy:

~~~
./node_modules/ws/bin/wscat -c ws://127.0.0.1:8090
~~~

You should see "connected" on the STDOUT and the first message from the upstream "Hellow.". You can now send any messages on the STDIN and the usptream will respond with the same message (echo server).