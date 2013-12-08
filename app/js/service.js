var Service;

Service = (function() {
  function Service(options) {
    this.options = options;
    if (this.options.token != null) {
      console.log("service initiated with token: " + options.token);
      this.token = this.options.token;
    } else {
      console.log("service initiated without token");
      this.oauth = (require('simple-oauth2'))(this.options);
    }
  }

  Service.prototype.getAuthorizationURI = function() {
    var authorizationURI;
    return authorizationURI = this.oauth.AuthCode.authorizeURL({
      redirect_uri: this.options.redirectURI,
      scope: this.options.scope
    });
  };

  Service.prototype.oauth = null;

  Service.prototype.getToken = function(request, callback) {
    var self, url, urlParts;
    if (this.token) {
      return callback != null ? callback.call(this) : void 0;
    } else {
      self = this;
      url = require('url');
      urlParts = url.parse(request.url, true);
      return this.oauth.AuthCode.getToken({
        code: urlParts.query.code,
        redirect_uri: this.options.redirectURI
      }, function(error, result) {
        if (error) {
          return console.log('Access Token Error', error.message);
        } else {
          self.token = self.oauth.AccessToken.create(result);
          return callback != null ? callback.call(self) : void 0;
        }
      });
    }
  };

  Service.prototype.get = function(path, callback) {
    var options, request;
    request = require('request');
    options = {
      url: this.options.site + path,
      oauth: {
        auth_token: this.token.token.access_token
      }
    };
    return request.get(options, function(error, response, body) {
      return callback(body);
    });
  };

  Service.prototype.getRoutes = function(id, callback) {
    return callback(null);
  };

  Service.prototype.getStatus = function(id, callback) {
    return callback(null);
  };

  return Service;

})();

module.exports = Service;
