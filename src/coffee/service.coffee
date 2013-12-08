class Service
  constructor: (@options) ->
    @oauth = (require 'simple-oauth2') @options

  getAuthorizationURI: ->
    # optionally, include `state` parameter
    authorizationURI = @oauth.AuthCode.authorizeURL
      redirect_uri: @options.redirectURI
      scope: @options.scope

  oauth: null

  getToken: (request, callback) ->
    self = @
    url = require 'url'
    urlParts = url.parse request.url, true

    @oauth.AuthCode.getToken {
      code: urlParts.query.code
      redirect_uri: @options.redirectURI
    }, (error, result) ->
      if (error)
        console.log 'Access Token Error', error.message
      else
        self.token = self.oauth.AccessToken.create result
        callback?.call self

  get: (path, callback) ->
    request = require 'request'
    options =
      url: @options.site + path
      oauth:
        auth_token: @token

    request.get options, (error, response, body) ->
      console.log arguments
      callback body

  getRoutes: (id, callback)->
    callback null

  getStatus: (id, callback)->
    callback null

module.exports = Service
