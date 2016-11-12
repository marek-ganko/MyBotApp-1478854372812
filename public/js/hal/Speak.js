'use strict';

const VOICE_NAME = 'Google UK English Female'; //Zarvox, Samantha, Daniel, Fiona, Karen
const VOICE_RATE = 0.7;

class Speak {

  constructor() {
    /*this.setVoice(VOICE_NAME).then((voice) => {
      console.log(voice);
      this.voice = voice;
    }).catch((error) => {
      console.log(error);
    });*/
  }

  setVoice(name = VOICE_NAME) {
    return new Promise((resolve, reject) => {

      speechSynthesis.onvoiceschanged = () => {
        const voices = speechSynthesis.getVoices();
        if (!voices) {
          reject('No voices available');
        }

        voices.map((voice) => {
          if (voice.name === name) {
            this.voice = voice;
            resolve(voice);
          }
        });
      };
    });

  }

  say(text) {
    return new Promise((resolve, reject) => {

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = this.voice;
      utterance.rate = VOICE_RATE;

      utterance.addEventListener('end', () => {
        console.log('koniec');
        resolve();
      });

      utterance.addEventListener('error', (event) => {
        reject(event.error);
      });

      console.log(utterance);
      speechSynthesis.speak(utterance);
    });
  }

}