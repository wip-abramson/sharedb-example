var express = require('express')
var WebSocket = require('ws')
var http = require('http');
var ShareDB = require('sharedb')
var path = require("path")
var WebSocketJSONStream = require('@teamwork/websocket-json-stream')
require('dotenv').config();

const PORT = process.env.EXPRESS_PORT || 8000;
const DB_PORT = process.env.DB_PORT || 27017

const db = require('sharedb-mongo')(`mongodb://localhost:${DB_PORT}`, {mongoOptions: { useUnifiedTopology: true}});
const backend = new ShareDB({db});
createDoc(startServer);

// Create initial document then fire callback
function createDoc(callback) {
    var connection = backend.connect();
    var doc = connection.get('examples', 'counting');
    doc.fetch(function(err) {
        if (err) throw err;
        if (doc.type === null) {
            console.log("creating document")
            doc.create({count: 0}, callback);
            return;
        }
        callback();
    });
}

function startServer() {
    // Create a web server to serve files and listen to WebSocket connections
    var app = express();
    app.use(express.static(path.join(__dirname, "..", "client", "build")));
    app.use(express.static('static'));
    var server = http.createServer(app);



    // Connect any incoming WebSocket connection to ShareDB
    var wss = new WebSocket.Server({server: server});
    wss.on('connection', function(ws) {
        var stream = new WebSocketJSONStream(ws);
        backend.listen(stream);
    });

    server.listen(PORT);
    console.log('Listening on http://localhost:' + PORT);
}
