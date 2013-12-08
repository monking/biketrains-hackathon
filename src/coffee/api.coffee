config = require '../../config.js'
Strava = require './strava.js'
Google = require './google.js'

token = null

getService = (options) ->

  serviceConfig = config.services[config.defaultService]
  serviceConfig.redirectURI = config.redirectURI

  # if token and token.expired()
  #   token.refresh (error, result) ->
  #     # stub

  options ?= {}
  options[key] ?= value for key, value of serviceConfig
  options.token ?= token.token.access_token if token?
  new (require "./#{config.defaultService}") options

api = module.exports =
  get:
    routes: (request, response) ->
      render = (data) ->
        data ?= {}
        data[key] ?= value for key, value of {
          title: config.title
          activities: null
          user:
            name: 'So-and-so'
            token: token
        }

        response.render '../src/views/routes.jade', data

      if token
        service = getService
          token: token
        id = request.params[1]
        if id
          console.log "looking up a specific route"
          service.getStatus id, (result) ->
            render
              title: config.title
              result: result
        else
          console.log "listing all routes"
          service.getRoutes (result) ->
            render
              title: config.title
              result: result
      else
        render()

    status: (request, response) ->
      if service
        service.getStatus id, (result) ->
          response.render '../src/views/routes.jade',
            title: config.title
            activities: activities
            user:
              name: 'So-and-so'
      else
        response.redirect '/'

    auth: (request, response) ->
      serviceOptions = {}
      serviceOptions.site = config.services[config.defaultService].authSite if config.services[config.defaultService].authSite?
      authURL = getService(serviceOptions).getAuthorizationURI()

      # response.send authURL # debug
      response.redirect authURL

    token: (request, response) ->
      getService().getToken request, () ->
        token = @token
        console.log token
        response.redirect '/'

  post: null #stub

  delete: null #stub
