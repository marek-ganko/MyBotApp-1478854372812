'use strict';

class Listen {

  constructor() {
    const SpeechRecognition = webkitSpeechRecognition || null;
    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = "en-GB";
  }

  listen() {

    return new Promise((resolve, reject) => {
      this.recognition.start();
      this.recognition.addEventListener('result', (event) => {
        console.log('Results: ', event.results);
        for (var i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            resolve(event.results[i][0].transcript);
          }
        }
      });

      this.recognition.addEventListener('error', function (event) {
        console.log('Recognition error');
        reject('An error has occurred while recognizing: ' + event.error);
      });

      this.recognition.addEventListener('nomatch', function (event) {
        console.log('Recognition ended because of nomatch');
        reject('Error: sorry but I could not find a match');
      });

      this.recognition.addEventListener('end', function (event) {
        console.log('Recognition ended');
        // If the Promise isn't resolved or rejected at this point
        // the demo is running on Chrome and Windows 8.1 (issue #428873).
        reject('Error: sorry but I could not recognize your speech');
      });

    });

  }

}