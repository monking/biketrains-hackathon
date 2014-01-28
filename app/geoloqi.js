var Geoloqi, Service, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Service = require('./service.js');

Geoloqi = (function(_super) {
  __extends(Geoloqi, _super);

  function Geoloqi() {
    _ref = Geoloqi.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Geoloqi.prototype.conductor = null;

  Geoloqi.prototype.routes = null;

  Geoloqi.prototype.status = null;

  Geoloqi.prototype.getConductor = function(callback) {
    var self;
    self = this;
    return this.get('/account/profile', function(body) {
      self.conductor = body;
      return callback(body);
    });
  };

  Geoloqi.prototype.getRoutes = function(callback) {
    return callback([
      {
        name: "Route 005",
        id: 5
      }
    ]);
  };

  Geoloqi.prototype.getStatus = function(id, callback) {
    var self;
    self = this;
    return this.get("/location/history/", function(data) {
      self.status = data;
      return callback(data);
    }, {
      count: 300
    });
  };

  return Geoloqi;

})(Service);

module.exports = Geoloqi;
