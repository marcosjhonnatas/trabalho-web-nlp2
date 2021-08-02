const fs = require('fs');
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const speechToText = new SpeechToTextV1({
  authenticator: new IamAuthenticator({
    apikey: '[COLEQUE SUA CHAVE SPEECH TO TEXT IBM AQUI]',
  }),
  serviceUrl: 'https://api.us-south.speech-to-text.watson.cloud.ibm.com/instances/93abfc54-51aa-463b-bd00-cb7c9a1cd171',
});

const recognizeParams = {
  model: 'pt-BR_NarrowbandModel',
  contentType: 'audio/wav',
  wordAlternativesThreshold: 0.9,
};

module.exports = {
  transformSpeechToText: (req, res) => {
    recognizeParams.audio = fs.createReadStream('uploads/audio.wav');

    return speechToText.recognize(recognizeParams)
      .then(speechRecognitionResults => {
        const transcricao = speechRecognitionResults.result.results[0].alternatives[0].transcript;
        return res.status(200).send({ transcricao });
      })
      .catch(err => {
        console.log('error:', err);
        return res.status(500).send();
      });
  }
};