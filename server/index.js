var express = require('express')
var WebSocket = require('ws')
var http = require('http');
var ShareDB = require('sharedb')
var path = require("path")
var WebSocketJSONStream = require('@teamwork/websocket-json-stream')
require('dotenv').config();

const {authorizeZcapInvocation} = require('@digitalbazaar/ezcap-express');
import asyncHandler from 'express-async-handler';
import didIo from 'did-io';
import didKeyDriver from 'did-method-key';
import jldl from 'jsonld-document-loader';

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


async function getRootController({
                                     req, rootCapabilityId, rootInvocationTarget
                                 }) {
    // get associated capability controller from database
    let controller;
    try {
        const record = await database.getMyThingById({
            id: rootInvocationTarget
        });
        controller = record.controller;
    } catch(e) {
        if(e.type === 'NotFoundError') {
            const url = req.protocol + '://' + req.get('host') + req.url;
            throw new Error(
                `Invalid capability identifier "${rootCapabilityId}" ` +
                `for URL "${url}".`);
        }
        throw e;
    }

    return controller;
}



const _documentLoader = new jldl.JsonLdDocumentLoader();

// support did:key
didIo.use('key', didKeyDriver.driver());

async function documentLoader(url) {
    let document;
    if(url.startsWith('did:')) {
        document = await didIo.get({did: url, forceConstruct: true});
        return {
            contextUrl: null,
            documentUrl: url,
            document
        };
    }

    // finally, try the base document loader
    return _documentLoader(url);
}

async function authorizeMyZcapInvocation({expectedTarget, expectedAction} = {}) {
    return authorizeZcapInvocation({
        expectedHost: 'ezcap.example',
        getRootController,
        documentLoader,
        expectedTarget,
        expectedAction,
    });
};

function startServer() {
    // Create a web server to serve files and listen to WebSocket connections
    var app = express();
    app.use(express.static(path.join(__dirname, "..", "client", "build")));
    app.use(express.static('static'));
    var server = http.createServer(app);

    app.post('/foo',
        authorizeMyZcapInvocation(),
        asyncHandler(async (req, res) => {
            // your code goes here
            // req.zcap is available to provide authz information
        }));

    // Connect any incoming WebSocket connection to ShareDB
    var wss = new WebSocket.Server({server: server});
    wss.on('connection', function(ws) {
        var stream = new WebSocketJSONStream(ws);
        backend.listen(stream);
    });

    server.listen(PORT);
    console.log('Listening on http://localhost:' + PORT);
}
