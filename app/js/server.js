var api, app, express;

express = require('express');

app = module.exports = express();

api = require('./api');

app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  return app.use(app.router);
});

app.listen(3000);

app.get('/', api.routes);
