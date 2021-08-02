const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

const textToSpeech = require('./routes/text-to-speech');
const speechToText = require('./routes/speech-to-text');

app.use('/text-to-speech', textToSpeech);
app.use('/speech-to-text', speechToText);

module.exports = app;