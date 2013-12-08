Service = require './service.js'

class Strava extends Service
  athlete: null
  activities: null
  stream: null
  getAthlete: (callback) ->
    self = @
    @get '/athlete', (body) ->
      self.athlete = body
      callback body

  getActivities: (callback) ->
    self = @
    @get '/athlete/activities', (body) ->
      self.activities = body
      callback body

  getActivityStream: (id, callback) ->
    self = @
    @get "/activities/#{id}/streams/latlng", (body) ->
      self.stream = body
      callback body

  getRoutes: (id, callback) ->
    @getActivities.apply @, arguments

  getStatus: (id, callback) ->
    @getActivityStream.apply @, arguments

module.exports = Strava
