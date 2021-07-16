var express = require('express')
var WebSocket = require('ws')
var http = require('http');
var ShareDB = require('sharedb')
var path = require("path")
var WebSocketJSONStream = require('@teamwork/websocket-json-stream')
require('dotenv').config();
const fs = require('fs');


let criteria = JSON.parse(fs.readFileSync('./data/criteria.json'));
let evaluations = JSON.parse(fs.readFileSync('./data/evaluations.json'));
let evaluators = JSON.parse(fs.readFileSync('./data/evaluators.json'));
let methods = JSON.parse(fs.readFileSync('./data/methods.json'));
let reports = JSON.parse(fs.readFileSync('./data/reports.json'));
let rubrics = JSON.parse(fs.readFileSync('./data/rubrics.json'));
let sources = JSON.parse(fs.readFileSync('./data/sources.json'));


const PORT = process.env.EXPRESS_PORT || 8000;
const DB_PORT = process.env.DB_PORT || 27017

const db = require('sharedb-mongo')(`mongodb://localhost:${DB_PORT}`, {mongoOptions: {useUnifiedTopology: true}});
const backend = new ShareDB({db});
initialiseDb(startServer);

// Create initial document then fire callback
function initialiseDb(callback) {
  var connection = backend.connect();

  for (report in reports) {
    var reportDoc = connection.get('report', report.id)
    reportDoc.fetch(function (err) {
      if (err) throw err;
      if (reportDoc.type === null) {
        console.log("creating document")
        reportDoc.create(report, () => {
        });
        return;
      }
    });
  }

  callback();
}

function startServer() {
  // Create a web server to serve files and listen to WebSocket connections
  var app = express();
  app.use(express.static(path.join(__dirname, "..", "client", "build")));
  app.use(express.static('static'));
  var server = http.createServer(app);


  // Connect any incoming WebSocket connection to ShareDB
  var wss = new WebSocket.Server({server: server});
  wss.on('connection', function (ws) {
    var stream = new WebSocketJSONStream(ws);
    backend.listen(stream);
  });

  server.listen(PORT);
  console.log('Listening on http://localhost:' + PORT);
}
