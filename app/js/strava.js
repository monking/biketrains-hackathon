var Service, Strava, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Service = require('./service.js');

Strava = (function(_super) {
  __extends(Strava, _super);

  function Strava() {
    _ref = Strava.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Strava.prototype.conductor = null;

  Strava.prototype.routes = null;

  Strava.prototype.status = null;

  Strava.prototype.getConductor = function(callback) {
    var self;
    self = this;
    return this.get('/athlete', function(body) {
      self.conductor = body;
      return callback(body);
    });
  };

  Strava.prototype.getRoutes = function(callback) {
    var self;
    self = this;
    return this.get('/athlete/activities', function(body) {
      self.activities = body;
      return callback(body);
    });
  };

  Strava.prototype.getStatus = function(id, callback) {
    var self;
    self = this;
    return this.get("/activities/" + id + "/streams/latlng", function(body) {
      self.stream = body;
      return callback(body);
    });
  };

  return Strava;

})(Service);

module.exports = Strava;
