class Service
  constructor: (@options) ->
    if @options.token?
      console.log "service initiated with token: #{options.token}"
      @token = @options.token
    else
      console.log "service initiated without token"
      @oauth = (require 'simple-oauth2') @options

  getAuthorizationURI: ->
    # optionally, include `state` parameter
    authorizationURI = @oauth.AuthCode.authorizeURL
      redirect_uri: @options.redirectURI
      scope: @options.scope

  oauth: null

  getToken: (request, callback) ->
    if @token
      callback?.call @
    else
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
        auth_token: @token.token.access_token

    request.get options, (error, response, body) ->
      callback body

  getRoutes: (id, callback)->
    callback null

  getStatus: (id, callback)->
    callback null

module.exports = Service
