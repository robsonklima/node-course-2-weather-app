const request = require('request');

var getTemperature = ((lat, lng, callback) => {
  var key = '3a492fcdc83d3a37e495058a4dd6b7db';

  request({
    url: `https://api.darksky.net/forecast/${key}/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to Forecast API.');
    } else if (response.statusCode === 400) {
      callback('Unable to fetch weather.');
    } else if (response.statusCode === 200) {
      callback(undefined, {
        temperature: (body.currently.temperature - 32) / 1.8,
        apparentTemperature: (body.currently.apparentTemperature - 32) / 1.8
      });
    }
  });
});

module.exports = {
  getTemperature
};
