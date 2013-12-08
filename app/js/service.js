var Service;

Service = (function() {
  function Service(options) {
    this.options = options;
    this.oauth = (require('simple-oauth2'))(this.options);
    if (this.options.token != null) {
      console.log("service initiated with token: " + options.token);
      this.setToken(this.options.token);
    } else {
      console.log("service initiated without token");
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

  Service.prototype.setToken = function(token) {
    this.tokenObject = this.oauth.AccessToken.create(token);
    return this.token = this.tokenObject.token;
  };

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
          self.setToken(result.access_token);
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
      method: "get",
      body: "access_token=" + this.token
    };
    return request.get(options, function(error, response, body) {
      return callback(response);
    });
  };

  Service.prototype.getRoutes = function(callback) {
    return callback(null);
  };

  Service.prototype.getStatus = function(id, callback) {
    return callback(null);
  };

  return Service;

})();

module.exports = Service;
