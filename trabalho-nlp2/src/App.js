import './App.css';
import React, { Component } from 'react';

import axios from 'axios';

import { Button } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp, faMicrophone, faStopCircle } from '@fortawesome/free-solid-svg-icons';
import AudioReactRecorder, { RecordState } from 'audio-react-recorder';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { valorTexto: '', recordState: null, gravando: false, transcricao: '' }

    this.transformarTextoParaVoz = this.transformarTextoParaVoz.bind(this);
    this.startStop = this.startStop.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeTranscricao = this.handleChangeTranscricao.bind(this);
  }

  transformarTextoParaVoz() {
    if (this.state.valorTexto) {
      axios.post(`http://127.0.0.1:4000/text-to-speech`, { texto: this.state.valorTexto })
      .then(res => {
        setTimeout(async () => {
          const audio = new Audio(`http://127.0.0.1:4000/audio.wav?timestamp=${new Date().getTime()}`);
          audio.type = 'audio/wav';

          try {
            await audio.play();
            console.log('Playing...');
          } catch (err) {
            console.log('Failed to play audio:\n' + err);
          }
        }, 0);
      })
    }
  }

  startStop() {
    this.setState({ gravando: !this.state.gravando }, () => {
      this.setState({ recordState: this.state.gravando ? RecordState.START : RecordState.STOP });
    });
  }

  handleChange(event) {
    this.setState({ valorTexto: event.target.value });
  }

  handleChangeTranscricao(event) {
    this.setState({ transcricao: event.target.value });
  }

  onStop = (audioData) => {
    const data = new FormData();

    const audioFile = new File([audioData.blob], 'audio');

    data.append('audio', audioFile, audioFile.name);

    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    }

    axios.post('http://127.0.0.1:4000/speech-to-text', data, config)
      .then(res => this.setState({ transcricao: res.data.transcricao }));
  }

  render() {
    const { recordState } = this.state;
    const currentRecordIcon = this.state.gravando ? faStopCircle : faMicrophone;

    return (
      <div className="container-principal">
        <div className="text-to-speech">
          <textarea
            className="input-text-to-speech"
            placeholder="Insira seu texto aqui"
            value={this.state.valorTexto} onChange={this.handleChange}>
          </textarea>

          <Button variant="contained" color="primary" onClick={this.transformarTextoParaVoz}>
            <span className="btn-text">Ouvir</span><FontAwesomeIcon icon={faVolumeUp} />
          </Button>
        </div>

        <div className="speech-to-text-container">
          <textarea
            disabled="disabled"
            className="input-text-to-speech"
            value={this.state.transcricao} onChange={this.handleChangeTranscricao}>
          </textarea>
          <Button size="large" variant="contained" color="secondary" onClick={this.startStop}>
            &nbsp;&nbsp;<span className="btn-text"><FontAwesomeIcon icon={currentRecordIcon} /></span>&nbsp;&nbsp;
          </Button>
        </div>

         <div className="grafico-onda-vocal">
          <AudioReactRecorder
              backgroundColor="rgb(255, 255, 255)"
              foregroundColor="rgb(63, 81, 181)"
              canvasWidth="700px" 
              canvasHeight="60" 
              state={recordState} 
              onStop={this.onStop} />
         </div>
      </div>
    );
  }
}

export default App;
