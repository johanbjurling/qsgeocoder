"use strict";

var geocoder = require("geocoder");

function geocode(addresses, done) {

  var result = [];

  function doGeocode() {
    var address = addresses[0];

    geocoder.geocode(address, function(err, data) {
      var obj = new Object();
      obj.address = address;

      if (data !== undefined && data.results[0] !== undefined) {

        obj.success = true;
        obj.coordinates = new Object();
        obj.coordinates.lng = data.results[0].geometry.location.lng;
        obj.coordinates.lat = data.results[0].geometry.location.lat;

      } else {
        obj.success = false;
      }

      result.push(obj);

      addresses.splice(0, 1);

      if (addresses.length > 0) {
        setTimeout(doGeocode, 1000);
      } else {
        done(result);
      }
    });
  }

  doGeocode();
}

exports.geocode = geocode;

