var initialize;

initialize = function() {
  var coords, format, latLng, line, lineOptions, map, mapBounds, mapOptions, _i, _j, _len, _len1, _ref, _ref1;
  mapOptions = {
    center: new google.maps.LatLng(34.00, -118.29),
    zoom: 8
  };
  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  mapBounds = new google.maps.LatLngBounds;
  lineOptions = {
    map: map,
    path: []
  };
  _ref = window.stream;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    format = _ref[_i];
    if ('latlng' !== format.type) {
      continue;
    }
    _ref1 = format.data;
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      coords = _ref1[_j];
      latLng = new google.maps.LatLng(coords[0], coords[1]);
      lineOptions.path.push(latLng);
      mapBounds.extend(latLng);
    }
  }
  line = new google.maps.Polyline(lineOptions);
  map.fitBounds(mapBounds);
  console.log(lineOptions);
  console.log(line);
  return window.map = map;
};

google.maps.event.addDomListener(window, 'load', initialize);
