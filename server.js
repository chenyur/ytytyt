'use strict';

const express = require('express');

// Constants
const PORT = 8081;

// App
const app = express();


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);

