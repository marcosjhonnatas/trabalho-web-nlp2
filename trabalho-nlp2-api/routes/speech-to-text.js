const express = require('express');
const multer = require('multer');
const speechToTextService = require('../services/speech-to-text.service');

const router = express.Router();

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
     cb(null, 'uploads/')
   },
   filename: (req, file, cb) => {
     cb(null,  `${file.originalname}.wav`);
   }
 })

router.post('/', multer({ storage }).single('audio'), speechToTextService.transformSpeechToText);

module.exports = router;