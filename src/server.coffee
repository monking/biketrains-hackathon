express = require 'express'
#mongoose = require 'mongoose'
app = module.exports = express()

# # connect to Mongo when the app initializes
# mongoose.connect 'mongodb://localhost/norum'

app.configure () ->
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(app.router)

# # set up the RESTful API, handler methods are defined in api.js
# api = require './controllers/api.js'
# app.post '/thread', api.post
# app.get '/thread/:title.:format?', api.show
# app.get '/thread', api.list

app.listen 3000

# app.register '.html', require('jade')

app.get '/', (req, res) ->
  res.send 'hi there'
