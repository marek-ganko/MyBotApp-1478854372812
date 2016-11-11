(function () {

  const HalListen = new Listen();
  const start = () => HalListen.listen()
    .then((result) => {
      console.log(result);
      /*halTextElement[0].innerHTML = '...';
      $http.get(`https://yoda.p.mashape.com/yoda?sentence=${encodeURI(result)}`, {
        headers: {'X-Mashape-Key': 'YuX5mt727rmsh2PDPTHIySgjnyJvp1hp1BQjsnFkRVicjDsYoB', 'Accept': 'text/plain'}
      }).then((result) => {
        console.log(result.data);

        //HalSpeak.say('You said: ' + result.data, halTextElement);
        HalSpeak.say('Yoda would say: ' + result.data, halTextElement);
        talkWithHal('Please tell me something else');
      });*/

    })
    .catch((error) => {
      console.log(error);
      /*HalSpeak.say(error, halTextElement);
      talkWithHal('Please tell me something else');*/
    });

  start();
})();