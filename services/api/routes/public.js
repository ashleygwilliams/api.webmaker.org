var Joi = require('joi');
var _ = require('lodash');

var publicRouteConfig = {
  config: {
    auth: false,
    cors: true
  }
};

var routes = [
  {
    path: '/api/skittles/{id}',
    method: 'GET',
    handler: require('../handlers/skittles'),
    config: {
      validate: {
        params: {
          id: Joi.number().required()
        }
      },
      description: 'Returns the skittle with the given id',
      notes: 'taste the rainbow'
    }
  }, {
    path: '/docs/css/style.css',
    method: 'GET',
    handler: {
      file: './node_modules/lout/public/css/style.css'
    },
    config: {
      plugins: {
        lout: false
      }
    }
  }, {
    path: '/',
    method: 'GET',
    handler: function(request, reply) {
      reply.redirect('/docs');
    },
    config: {
      plugins: {
        lout: false
      }
    }
  }
];

routes = routes.map(function(route) {
  return _.merge({}, publicRouteConfig, route);
});

module.exports = routes;
