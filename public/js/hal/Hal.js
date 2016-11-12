'use strict';

class Hal {
  constructor() {
    this.speak = new Speak();
  }

  start() {
    this.speak.setVoice().then(this.startTalking.bind(this));
  }

  startTalking() {
    this.writeToChat('Hello there', 'bot');
    this.speak.say('Hello there').then(this.startListening.bind(this));
  }

  startListening() {
    this.listen = new Listen();
    return this.listen.start()
      .then((humanText) => {

        console.log(humanText);

        this.writeToChat(humanText, 'human');
        fetch('/processText', {
          method: 'post',
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify({
            text: humanText
          })
        }).then((response) => {
          this.writeToChat(response.text(), 'bot');
        })
      })
      .catch((error) => {
        this.writeToChat(error, 'bot');
        console.log(error);
      });
  }

  writeToChat(text, who) {
    const chatBoxBot = document.createElement('div');
    chatBoxBot.className = `chat-box-${who}`;
    chatBoxBot.innerHTML = text;
    document.getElementById('chat-box').appendChild(chatBoxBot);
  }

}