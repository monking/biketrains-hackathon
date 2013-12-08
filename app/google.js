var Google, Service, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Service = require('./service.js');

Google = (function(_super) {
  __extends(Google, _super);

  function Google() {
    _ref = Google.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  return Google;

})(Service);

module.exports = Google;
