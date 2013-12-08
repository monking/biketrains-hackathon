class Service
  constructor: (@options) ->
    @oauth = (require 'simple-oauth2') @options
    if @options.token?
      console.log "service initiated with token: #{options.token}"
      @setToken @options.token
    else
      console.log "service initiated without token"

  getAuthorizationURI: ->
    # optionally, include `state` parameter
    authorizationURI = @oauth.AuthCode.authorizeURL
      redirect_uri: @options.redirectURI
      scope: @options.scope

  oauth: null

  setToken: (token) ->
    @tokenObject = @oauth.AccessToken.create token
    @token = @tokenObject.token

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
          self.setToken result.access_token
          callback?.call self

  get: (path, callback) ->
    request = require 'request'
    options =
      url: @options.site + path
      method: "get"
      body: "access_token=#{@token}"

    # using post method to enable `body`, forcing method `GET`
    request.get options, (error, response, body) ->
      callback response

  getRoutes: (callback)->
    callback null

  getStatus: (id, callback)->
    callback null

module.exports = Service
