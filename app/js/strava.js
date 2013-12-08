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

  Strava.prototype.athlete = null;

  Strava.prototype.activities = null;

  Strava.prototype.stream = null;

  Strava.prototype.getAthlete = function(callback) {
    var self;
    self = this;
    return this.get('/athlete', function(body) {
      self.athlete = body;
      return callback(body);
    });
  };

  Strava.prototype.getActivities = function(callback) {
    var self;
    self = this;
    return this.get('/athlete/activities', function(body) {
      self.activities = body;
      return callback(body);
    });
  };

  Strava.prototype.getActivityStream = function(id, callback) {
    var self;
    self = this;
    return this.get("/activities/" + id + "/streams/latlng", function(body) {
      self.stream = body;
      return callback(body);
    });
  };

  Strava.prototype.getRoutes = function(id, callback) {
    return this.getActivities.apply(this, arguments);
  };

  Strava.prototype.getStatus = function(id, callback) {
    return this.getActivityStream.apply(this, arguments);
  };

  return Strava;

})(Service);

module.exports = Strava;
