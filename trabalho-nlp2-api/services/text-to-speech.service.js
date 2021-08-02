const fs = require('fs');

const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const params = {
  voice: 'pt-BR_IsabelaVoice',
  accept: 'audio/wav'
};

const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: '[COLEQUE SUA CHAVE TEXT TO SPEECH IBM AQUI]',
  }),
  serviceUrl: 'https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/660ca57c-d105-4f21-b2d4-15c4f4007aa8',
});

module.exports = {
  transformTextToSpeech: (req, res) => {
    const textoDigitado = req.body.texto;

    params.text = textoDigitado;

    return textToSpeech.synthesize(params)
      .then(response => {
        const audio = response.result;
        return textToSpeech.repairWavHeaderStream(audio);
      }).then(repairedFile => {
        fs.writeFileSync('public/audio.wav', repairedFile);
      }).then(() => {
        res.status(200).send();
      });
  }
};