var OAuth2, api, authToken, config;

config = require('../../config.js');

OAuth2 = (require('simple-oauth2'))({
  clientID: config.services.google.clientID,
  clientSecret: config.services.google.clientSecret,
  site: config.services.google.authSite,
  authorizationPath: config.services.google.authorizationPath,
  tokenPath: config.services.google.tokenPath
});

authToken = null;

api = module.exports = {
  get: {
    routes: function(request, response) {
      console.log(authToken);
      return response.render('../src/views/routes.jade', {
        title: config.title,
        loggedIn: authToken != null,
        user: {
          name: 'So-and-so'
        }
      });
    },
    auth: function(request, response) {
      var authorizationURI;
      authorizationURI = OAuth2.AuthCode.authorizeURL({
        redirect_uri: config.redirectURI,
        scope: config.services.google.scope
      });
      return response.redirect(authorizationURI);
    },
    token: function(request, response) {
      var url, urlParts;
      url = require('url');
      urlParts = url.parse(request.url, true);
      return OAuth2.AuthCode.getToken({
        code: urlParts.query.code,
        redirect_uri: config.redirectURI
      }, function(error, result) {
        var tokenResult;
        if (error) {
          return console.log('Access Token Error', error.message);
        } else {
          tokenResult = OAuth2.AccessToken.create(result);
          (tokenResult != null) && (authToken = tokenResult.token);
          return response.redirect('/');
        }
      });
    }
  },
  post: null,
  "delete": null
};
