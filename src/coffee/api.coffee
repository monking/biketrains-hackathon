config = require '../../config.js'
Strava = require './strava.js'
Google = require './google.js'

service = null
getService = (token) ->
  if !service?
    options = config.services[config.defaultService]
    options.redirectURI = config.redirectURI
    service = new (require "./#{config.defaultService}") options

  service

api = module.exports =
  get:
    route: (request, response) ->
      render = (activities = null) ->
        response.render '../src/views/routes.jade',
          title: config.title
          activities: activities
          user:
            name: 'So-and-so'

      if service
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
      response.redirect getService().getAuthorizationURI()

    token: (request, response) ->
      getService().getToken request, () ->
        response.redirect '/'

  post: null #stub

  delete: null #stub
