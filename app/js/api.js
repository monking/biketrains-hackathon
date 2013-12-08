var Google, Strava, api, config, getService, token;

config = require('../../config.js');

Strava = require('./strava.js');

Google = require('./google.js');

token = null;

getService = function(options) {
  var key, serviceConfig, value;
  serviceConfig = config.services[config.defaultService];
  serviceConfig.redirectURI = config.redirectURI;
  if (options == null) {
    options = {};
  }
  for (key in serviceConfig) {
    value = serviceConfig[key];
    if (options[key] == null) {
      options[key] = value;
    }
  }
  return new (require("./" + config.defaultService))(options);
};

api = module.exports = {
  get: {
    route: function(request, response) {
      var id, render, service;
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
      if (token) {
        service = getService({
          token: token
        });
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
      var authURL, serviceOptions;
      serviceOptions = {};
      if (config.services[config.defaultService].authSite != null) {
        serviceOptions.site = config.services[config.defaultService].authSite;
      }
      authURL = getService(serviceOptions).getAuthorizationURI();
      return response.redirect(authURL);
    },
    token: function(request, response) {
      return getService().getToken(request, function() {
        token = this.token;
        return response.redirect('/');
      });
    }
  },
  post: null,
  "delete": null
};
