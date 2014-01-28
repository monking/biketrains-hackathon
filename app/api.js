var Google, Strava, api, config, getService, inherit, token, viewDefaultData,
  __slice = [].slice;

config = require('../config.js');

Strava = require('./strava.js');

Google = require('./google.js');

token = null;

viewDefaultData = {
  title: config.title,
  subtitle: 'Commute by bike',
  user: {
    name: 'Christopher',
    token: null
  },
  routes: null,
  route: null,
  stream: null,
  conductor: null,
  ride: null,
  services: config.services
};

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
  service = new (require("./" + config.defaultService))(options);
  console.log("created service " + config.defaultService);
  if (service.token != null) {
    token = service.token;
  }
  return service;
};

inherit = function() {
  var child, key, parent, parents, value, _i, _len;
  child = arguments[0], parents = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
  if (child == null) {
    child = {};
  }
  for (_i = 0, _len = parents.length; _i < _len; _i++) {
    parent = parents[_i];
    for (key in parent) {
      value = parent[key];
      if (child[key] == null) {
        child[key] = value;
      }
    }
  }
  return child;
};

api = module.exports = {
  get: {
    routes: function(request, response) {
      var data, render, service;
      render = function(data) {
        return response.render('../src/views/routes.jade', data);
      };
      service = getService();
      if (service.token) {
        if (request.query.zip_from) {
          return service.getRoutes(function(result) {
            var data;
            data = inherit({
              subtitle: "All Routes",
              routes: result,
              query: request.query,
              user: {
                name: 'Christopher',
                token: service.token
              }
            }, viewDefaultData);
            return render(data);
          });
        } else {
          data = inherit({
            subtitle: "All Routes",
            routes: null,
            query: request.query,
            user: {
              name: 'Christopher',
              token: service.token
            }
          }, viewDefaultData);
          return render(data);
        }
      } else {
        return render(viewDefaultData);
      }
    },
    status: function(request, response) {
      var id, service;
      service = getService();
      if (service.token) {
        id = request.params[0];
        return service.getStatus(id, function(result) {
          var data;
          data = inherit({
            subtitle: 'Strava Route',
            route: {
              id: id
            },
            stream: result,
            user: {
              name: 'Christopher',
              token: service.token
            }
          }, viewDefaultData);
          return response.render('../src/views/status.jade', data);
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
