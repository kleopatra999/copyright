var signup = require('./signup');
var boom = require('boom');

var routes = {
  'signup': function(request, reply) {
    var transaction = request.payload;
    const signup_service = Date.now();

    signup(transaction, function(err, payload) {
      if (err) {
        request.log(['error', 'signup'], {
          request_id: request.headers['x-request-id'],
          service: Date.now() - signup_service,
          code: err.code,
          type: err.type,
          param: err.param
        });

        return reply(boom.wrap(err, 500, 'Unable to complete Basket signup'));
      }

      request.log(['signup'], {
        request_id: request.headers['x-request-id'],
        service: Date.now() - signup_service
      });

      reply(payload).code(201);
    });
  },

  'call': function(request, reply) {
    var success = Math.random() > 0.5;
    var status = success ? 200 : 409;
    reply({ 'call_placed': success }).code(status);
  }
};

module.exports = routes;
