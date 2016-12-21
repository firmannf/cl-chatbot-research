// Add dependencies
var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.PORT || 3000, function() {
  console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
var connector = new builder.ChatConnector(
  {
    appId: '0aa3c327-ba63-44f2-bd1b-371d0cde505b',
    appPassword: 'saW3mpMraogCni38Y3MTJGF'
  }
);
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

// Create bot dialogs
bot.dialog('/', function(session) {
  session.send("Hello world");
});