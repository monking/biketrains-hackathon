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
  if (token != null) {
    if (options.token == null) {
      options.token = token.token.access_token;
    }
  }
  return new (require("./" + config.defaultService))(options);
};

api = module.exports = {
  get: {
    routes: function(request, response) {
      var id, render, service;
      render = function(data) {
        var key, value, _ref;
        if (data == null) {
          data = {};
        }
        _ref = {
          title: config.title,
          activities: null,
          user: {
            name: 'So-and-so',
            token: token
          }
        };
        for (key in _ref) {
          value = _ref[key];
          if (data[key] == null) {
            data[key] = value;
          }
        }
        return response.render('../src/views/routes.jade', data);
      };
      if (token) {
        service = getService({
          token: token
        });
        id = request.params[1];
        if (id) {
          console.log("looking up a specific route");
          return service.getStatus(id, function(result) {
            return render({
              title: config.title,
              result: result
            });
          });
        } else {
          console.log("listing all routes");
          return service.getRoutes(function(result) {
            return render({
              title: config.title,
              result: result
            });
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
        console.log(token);
        return response.redirect('/');
      });
    }
  },
  post: null,
  "delete": null
};
