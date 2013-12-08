express = require 'express'
#mongoose = require 'mongoose'
app = module.exports = express()

# # connect to Mongo when the app initializes
# mongoose.connect 'mongodb://localhost/norum'

app.configure () ->
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(app.router)

api = require './api'

# define default routes based on API structure
app.get new RegExp("^/#{name}/?(.*)"), action for name, action of api.get

# routes to static files
app.use express.static "#{__dirname}/../public"

# add more routes as needed
app.get '/', api.get.routes

app.listen 3000
