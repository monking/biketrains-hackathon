initialize = ->
  mapOptions =
    center: new google.maps.LatLng 34.00, -118.29
    zoom: 8
  map = new google.maps.Map document.getElementById("map-canvas"), mapOptions

  mapBounds = new google.maps.LatLngBounds

  lineOptions =
    map:map
    path:[]
  for format in window.stream
    if 'latlng' != format.type then continue
    for coords in format.data
      latLng = new google.maps.LatLng coords[0], coords[1]
      lineOptions.path.push latLng
      mapBounds.extend latLng

  line = new google.maps.Polyline lineOptions

  map.fitBounds mapBounds

  console.log lineOptions
  console.log line

  window.map = map

google.maps.event.addDomListener window, 'load', initialize
