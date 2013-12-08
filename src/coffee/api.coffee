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
  options.token = options.token or token or (config.debug and serviceConfig.debugToken)
  console.log options
  service = new (require "./#{config.defaultService}") options

  token = service.token if service.token?

  service

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

      service = getService()

      if service.token
        service.getRoutes (result) ->
          render
            title: config.title
            subtitle: "All Routes"
            result: result
      else
        render()

    status: (request, response) ->
      service = getService()
      if service.token
        id = request.params[0]
        console.log "getting route ##{id}"

        console.log service.token
        service.getStatus id, (result) ->
          response.render '../src/views/routes.jade',
            title: config.title
            subtitle: "Route #{id}"
            result: result
            user:
              name: 'So-and-so'
              token: service.token
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
