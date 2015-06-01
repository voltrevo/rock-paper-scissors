'use strict';

console.log('before opentok:', Date.now());
var opentok = require('opentok');
console.log('after  opentok:', Date.now());

module.exports = function(config) {
  var self = (new (function rockPaperScissors(){}));

  var clients = [];

  console.log('Initializing opentok with: ' + JSON.stringify(config));
  self.otHandle = opentok(config.apiKey, config.apiSecret);

  self.addClient = function(client) {
    clients.push(client);

    self.otHandle.createSession(function(err, session) {
      if (err) {
        throw err;
      }

      console.log('Created session, id: ' + session.sessionId);

      client.emit('sessionId', JSON.stringify(session.sessionId));
    });
  };

  return self;
};
