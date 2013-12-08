var action, api, app, express, name, _ref;

express = require('express');

app = module.exports = express();

app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  return app.use(app.router);
});

api = require('./api');

_ref = api.get;
for (name in _ref) {
  action = _ref[name];
  app.get(new RegExp("^/" + name + "/?(.*)"), action);
}

app.get('/', api.get.route);

app.listen(3000);
