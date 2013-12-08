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
    @get '/athlete/activities', (body) ->
      self.activities = body
      callback body

  getStatus: (id, callback) ->
    self = @
    @get "/activities/#{id}/streams/latlng", (body) ->
      self.stream = body
      callback body

module.exports = Strava
