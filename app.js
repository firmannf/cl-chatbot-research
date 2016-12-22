// Add dependencies
var express = require('express');
var builder = require('botbuilder');
var twitter = require('twitter');

// Setup Restify Server
var app = express();
app.listen(process.env.PORT || 3000, function () {
  console.log('Connected');
});

//Twitter Config
var client = new twitter({
  consumer_key: 'YyvjNOU9g4yqLLtDeQYh8cQ6c',
  consumer_secret: 'iyP0VGOHO1wtL4IhhI45XZblyIL2sguEspCE7dyMXLjvk6BBQf',
  access_token_key: '238039202-P9jWZbx3SSJgzN5pePye3b38sXupYKiVZ1MMgD2Q',
  access_token_secret: 'JVReqJNBbNthUFgJL78tCtiP4tiE3pgFVfSi515cDokBZ'
});

// Create chat bot
var connector = new builder.ChatConnector({
  appId: '0aa3c327-ba63-44f2-bd1b-371d0cde505b',
  appPassword: 'saW3mpMraogCni38Y3MTJGF'
});
var bot = new builder.UniversalBot(connector, {
  persistConversationData: true
});
app.post('/api/messages', connector.listen());

// Create bot dialogs
var UserNameKey = 'UserName';
var UserWelcomedKey = 'UserWelcomed';
var CityKey = 'City';

// Bot dialogs
bot.dialog('/', function (session) {
  session.send('Welcome to the Twikipedia.');
  session.beginDialog('/sendTweet');
});

bot.dialog('/sendTweet', new builder.IntentDialog()
  .matches(/^send tweet/i, function (session) {
    session.beginDialog('/postTweet');
  }).onDefault(function (session) {
    session.send('My bad, Your message is not recognized by me :(');
  })
);

bot.dialog('/postTweet', new builder.SimpleDialog(function (session, results) {
  if (results && results.response) {
    client.post('statuses/update', {
      status: results.response
    }, function (error, tweet, response) {
      if (error) {
        session.send('I cannot send your tweet :(');
      }
      return;
    });
        session.send('Your tweet has been posted.');
        session.replaceDialog('/sendTweet');
    return;
  }

  builder.Prompts.text(session, 'Please enter your tweet!');
}));