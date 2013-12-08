config = require '../config.js'
Strava = require './strava.js'
Google = require './google.js'

token = null

viewDefaultData =
  title: config.title
  user:
    name: 'So-and-so'
    token: null
  routes: null
  route: null
  stream: null
  conductor: null
  ride: null
  services: config.services

getService = (options) ->

  serviceConfig = config.services[config.defaultService]
  serviceConfig.redirectURI = config.redirectURI

  # if token and token.expired()
  #   token.refresh (error, result) ->
  #     # stub

  options ?= {}
  options[key] ?= value for key, value of serviceConfig
  options.token = options.token or token or (config.debug and serviceConfig.debugToken)
  service = new (require "./#{config.defaultService}") options

  token = service.token if service.token?

  service

inherit = (child, parents...) ->
  child ?= {}
  (child[key] ?= value for key, value of parent) for parent in parents
  child

api = module.exports =
  get:
    routes: (request, response) ->
      render = (data) ->
        response.render '../src/views/routes.jade', data

      service = getService()

      if service.token
        service.getRoutes (result) ->
          data = inherit {
            subtitle: "All Routes",
            routes: result
            user:
              name: 'So-and-so'
              token: service.token
          }, viewDefaultData

          render data
      else
        render  viewDefaultData

    status: (request, response) ->
      service = getService()
      if service.token
        id = request.params[0]

        service.getStatus id, (result) ->
          # console.log result
          data = inherit {
            route:
              id: id
            stream: result
            user:
              name: 'So-and-so'
              token: service.token
          }, viewDefaultData

          response.render '../src/views/status.jade', data
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
