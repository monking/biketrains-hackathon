var Google, Strava, api, config, getService, token;

config = require('../../config.js');

Strava = require('./strava.js');

Google = require('./google.js');

token = null;

getService = function(options) {
  var key, service, serviceConfig, value;
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
  options.token = options.token || token || (config.debug && serviceConfig.debugToken);
  console.log(options);
  service = new (require("./" + config.defaultService))(options);
  if (service.token != null) {
    token = service.token;
  }
  return service;
};

api = module.exports = {
  get: {
    routes: function(request, response) {
      var render, service;
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
      service = getService();
      if (service.token) {
        return service.getRoutes(function(result) {
          return render({
            title: config.title,
            subtitle: "All Routes",
            result: result
          });
        });
      } else {
        return render();
      }
    },
    status: function(request, response) {
      var id, service;
      service = getService();
      if (service.token) {
        id = request.params[0];
        console.log("getting route #" + id);
        console.log(service.token);
        return service.getStatus(id, function(result) {
          return response.render('../src/views/routes.jade', {
            title: config.title,
            subtitle: "Route " + id,
            result: result,
            user: {
              name: 'So-and-so',
              token: service.token
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
