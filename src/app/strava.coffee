Service = require './service.js'

class Strava extends Service
  conductor: null
  routes: null
  status: null
  getConductor: (callback) ->
    self = @
    @get '/athlete', (body) ->
      self.conductor = body
      callback body

  getRoutes: (callback) ->
    self = @
    @get '/athlete/activities', (data) ->
      self.routes = data #TODO: check if there are errors
      callback data

  getStatus: (id, callback) ->
    self = @
    @get "/activities/#{id}/streams/latlng", (data) ->
      self.status = data #TODO: check if there are errors
      callback data

module.exports = Strava
