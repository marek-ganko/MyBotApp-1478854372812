'use strict';

class Hal {
  constructor() {
    this.speak = new Speak();
    this.lastContext = {};
  }

  start() {
    this.speak.setVoice().then(this.startTalking.bind(this, 'Hello there'));
  }

  startTalking(text) {
    this.changeHalToActive(true);
    this.writeToChat(text, 'bot');
    this.speak.say(text).then(this.startListening.bind(this));
  }

  changeHalToActive(active = true) {
    const div = document.getElementById('hal');
    if (active) {
      div.classList.add('active');
    } else {
      div.classList.remove('active');
    }
  }

  startListening() {
    this.changeHalToActive(false);
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
            text: humanText,
            context: this.lastContext
          })
        }).then((response) => {
          return response.json();
        }).then((json) => {
          console.log(json);
          this.lastContext = json.context;
          this.startTalking(json.output.text.pop(), 'bot');
        })
      })
      .catch((error) => {
        console.log(error);
        this.startTalking(error.substring(0, 50), 'bot');
      });
  }

  writeToChat(text, who) {
    const chatBoxBot = document.createElement('div');
    chatBoxBot.className = `chat-box-${who}`;
    chatBoxBot.innerHTML = text;
    document.getElementById('chat-box').appendChild(chatBoxBot);
  }

}