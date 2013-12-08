var api, config;

api = module.exports = {};

config = require('../../config.js');

api.routes = function(req, res) {
  return res.render('../src/views/routes.jade', {
    title: config.title
  });
};
