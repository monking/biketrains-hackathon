var Google, Strava, api, config, getService, service;

config = require('../../config.js');

Strava = require('./strava.js');

Google = require('./google.js');

service = null;

getService = function(token) {
  var options;
  if (service == null) {
    options = config.services[config.defaultService];
    options.redirectURI = config.redirectURI;
    service = new (require("./" + config.defaultService))(options);
  }
  return service;
};

api = module.exports = {
  get: {
    route: function(request, response) {
      var id, render;
      render = function(activities) {
        if (activities == null) {
          activities = null;
        }
        return response.render('../src/views/routes.jade', {
          title: config.title,
          activities: activities,
          user: {
            name: 'So-and-so'
          }
        });
      };
      if (service) {
        id = request.params[1];
        if (id) {
          return service.getStatus(id, function(result) {
            return render(result);
          });
        } else {
          console.log(service.token);
          return service.getRoutes(function(result) {
            return render(result);
          });
        }
      } else {
        return render();
      }
    },
    status: function(request, response) {
      if (service) {
        return service.getStatus(id, function(result) {
          return response.render('../src/views/routes.jade', {
            title: config.title,
            activities: activities,
            user: {
              name: 'So-and-so'
            }
          });
        });
      } else {
        return response.redirect('/');
      }
    },
    auth: function(request, response) {
      return response.redirect(getService().getAuthorizationURI());
    },
    token: function(request, response) {
      return getService().getToken(request, function() {
        return response.redirect('/');
      });
    }
  },
  post: null,
  "delete": null
};
