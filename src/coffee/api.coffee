config = require '../../config.js'

OAuth2 = (require 'simple-oauth2')
  clientID: config.services.google.clientID
  clientSecret:config.services.google.clientSecret
  site: config.services.google.authSite
  authorizationPath: config.services.google.authorizationPath
  tokenPath: config.services.google.tokenPath

authToken = null

api = module.exports =
  get:
    routes: (request, response) ->
      console.log authToken
      response.render '../src/views/routes.jade',
        title: config.title
        loggedIn: authToken?
        user:
          name: 'So-and-so'

    auth: (request, response) ->
      # optionally, include `state` parameter
      authorizationURI = OAuth2.AuthCode.authorizeURL
        redirect_uri: config.redirectURI
        scope: config.services.google.scope

      response.redirect authorizationURI

    token: (request, response) ->
      url = require 'url'
      urlParts = url.parse request.url, true

      OAuth2.AuthCode.getToken {
        code: urlParts.query.code
        redirect_uri: config.redirectURI
      }, (error, result) ->
        if (error)
          console.log 'Access Token Error', error.message
        else
          tokenResult = OAuth2.AccessToken.create result
          tokenResult? and authToken = tokenResult.token
          response.redirect '/'

  post: null #stub

  delete: null #stub
