/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var bodyParser = require('body-parser');
var watson = require('watson-developer-cloud');
var conversation = watson.conversation({
  username: '937eddb0-87db-47e0-a13b-ccb906e2c45b',
  password: '4ZXwpS8HbGrX',
  version: 'v1',
  version_date: '2016-09-20'
});

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.json({
  limit: '16mb'
}));
app.use(bodyParser.urlencoded({
  extended: true
}));

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

app.post('/processText', function(req, res) {
  console.log(req.body);
  conversation.message({
	  workspace_id: '71c72219-ab8f-465d-bebb-30886247915f',
	  input: {'text': req.body.text},
	  context: req.body.context
	},  function(err, response) {
	  if (err) {
		console.log('error:', err);
	  } else {
		res.send(JSON.stringify(response));
		console.log(JSON.stringify(response, null, 2));
	  }
	});
  
  // connect to service
});

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});

//
