'use strict';
const fs = require('fs');
const ytdl = require('ytdl-core');
let path = require('path');
const express = require('express');

// Constants
const PORT = 8081;
let bodyParser = require('body-parser');
let version = 0;

// App
let oneDay = 1;
let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/public", express.static(__dirname + '/public', { maxAge: oneDay }));

app.get('/', function (req, res) {

  if(typeof req.query.songinfo != "undefined")
  {
    console.log("downloading");
    version++;
    ytdl(req.query.songinfo, { filter: "audioonly" } )
      .pipe(fs.createWriteStream("public/audio" + version + ".mp3"));
  }

  res.sendFile(__dirname + '/index.html');
});

app.get('/version', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  console.log("sending back version " + version);
  setTimeout(delayedSend(res), 10000);
});

function delayedSend(res) {
  console.log("delayed ajax response");
  res.send(JSON.stringify(version));
}

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);

