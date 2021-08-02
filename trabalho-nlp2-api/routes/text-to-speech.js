const express = require('express');
const router = express.Router();

const textToSpeechService = require('../services/text-to-speech.service');
const app = require('..');

router.post('/', textToSpeechService.transformTextToSpeech);

module.exports = router;