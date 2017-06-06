'use strict';

const fs = require('fs');
const ytdl = require('ytdl-core');
let path = require('path');
const express = require('express');

let YouTube = require('youtube-node');
let youTube = new YouTube();

// Constants
const debug = true;
const PORT = 8081;
let bodyParser = require('body-parser');
let version = 0;
let songName = "";
youTube.setKey('AIzaSyAcRLK98ehKQFGQIp7rXeDyu255NrCOosE');

// App
let veryShortTime = 200;
let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/public", express.static(__dirname + '/public', { maxAge: veryShortTime }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})
app.get('/song', function (req, res) {
  console.log(req.query.songinfo);

  let youtubeID = "";

  if(typeof req.query.songinfo != "undefined" || req.query.songinfo == "")
  {
    youTube.addParam('type', 'video');
    youTube.search(req.query.songinfo, 1, function(error, result)
    {
      console.log(JSON.stringify(result.items));
      if (error) {
        console.log("Search error " + error);
      }
      else if (result.items.length == 0)
      {
        console.log("empty search result");
      }
      else {
        youtubeID = result.items[0].id.videoId;
        songName = result.items[0].snippet.title;
        res.setHeader('Content-Type', 'application/json');
        res.send(songName);
        console.log(songName);
        version++;
        if (debug)
        {
          console.log("fetched youtubeID " + youtubeID);
          console.log("-------------");
          console.log(version);
          console.log(req.query.songinfo);
          console.log(youtubeID);
          console.log("-------------");
        }

        ytdl(youtubeID, { filter: "audioonly" } )
        .pipe(fs.createWriteStream("public/audio" + version + ".mp3"));
        console.log("saved v" + version + "; songinfo: " + req.query.songinfo);
      }
    });
  }
});

app.get('/version', function (req, res)
{
  res.setHeader('Content-Type', 'application/json');
  console.log("sending back version " + version);
  const wait = time => new Promise((resolve) => setTimeout(resolve, time));
  wait(1000).then(() => res.send(JSON.stringify(version)));
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
