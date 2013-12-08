api = module.exports = {}

config = require '../../config.js'

api.routes = (req, res) ->
  res.render '../src/views/routes.jade',
    title: config.title
