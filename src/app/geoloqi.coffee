Service = require './service.js'

class Geoloqi extends Service
  conductor: null
  routes: null
  status: null
  getConductor: (callback) ->
    self = @
    @get '/account/profile', (body) ->
      self.conductor = body
      callback body

  getRoutes: (callback) ->
    # dummy data
    callback [
      {
        name: "Route 005",
        id: 5
      }
    ]

  getStatus: (id, callback) ->
    # the id is ignored for now
    self = @
    @get "/location/history/", (data) ->
      self.status = data #TODO: check if there are errors
      callback data
    ,
      count: 300

module.exports = Geoloqi
