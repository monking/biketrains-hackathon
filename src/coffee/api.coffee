config = require '../../config.js'
Strava = require './strava.js'
Google = require './google.js'

token = null

getService = (options) ->

  serviceConfig = config.services[config.defaultService]
  serviceConfig.redirectURI = config.redirectURI

  # use service config, and override with provided options
  options ?= {}
  options[key] ?= value for key, value of serviceConfig
  new (require "./#{config.defaultService}") options

api = module.exports =
  get:
    route: (request, response) ->
      render = (activities = null) ->
        response.render '../src/views/routes.jade',
          title: config.title
          activities: activities
          user:
            name: 'So-and-so'

      if token
        service = getService
          token: token
        id = request.params[1]
        if id
          service.getStatus id, (result) ->
            render result
        else
          console.log service.token
          service.getRoutes (result) ->
            render result
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
        response.redirect '/'

  post: null #stub

  delete: null #stub
