require('habitat').load('tests.env');

var Hapi = require('hapi');
var TOKENS = require('./tokens');

function mockTokenValidator(token, callback) {
  var t = TOKENS[token];
  callback(null, !!t, t);
}

module.exports = function(done) {
  var server = new Hapi.Server();
  server.connection();

  server.register(require('hapi-auth-bearer-token'), function(err) {
    if ( err ) {
      throw err;
    }

    server.auth.strategy('token', 'bearer-access-token', {
      validateFunc: mockTokenValidator,
      allowQueryToken: false,
      tokenType: 'token'
    });

    // stub
    server.decorate('server', 'debug', function() {});

    server.register([
        require('../../services/api/lib/utils'),
        require('../../services/api/lib/postgre')(require('pg'))
      ], function() {
      server.route(require('../../services/api/routes'));

      server.start(function() {
        return done(server);
      });
    });
  });
};
