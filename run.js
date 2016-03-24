var Particle = require('particle-api-js');
var particle = new Particle();
var request = require('request');

function parseForecast(body) {
var forecast = body.forecast.simpleforecast.forecastday[0].icon;
  switch(forecast) {
    case 'clear':
    case 'sunny':
    case 'mostlysunny':
      return 'sunny';

    case 'partlycloudy':
    case 'hazy':
    case 'partlysunny' :
      return 'partlycloudy';

    case 'cloudy':
    case 'mostlycloudy':
    case 'fog':
      return 'cloudy';

    case 'chanceflurries':
    case 'chancerain':
    case 'chancesleet':
    case 'chancesnow':
    case 'chancetstorms':
    case 'flurries':
    case 'sleet':
    case 'rain':
    case 'snow':
    case 'tstorms':
    case 'unknown':
      return 'rain';
    
    default:
      return 'rain';
  }
}

console.log('Getting current weather...');

var options = {
  url: 'http://api.wunderground.com/api/'+ process.env.WEATHERUNDERGROUND_API_KEY +'/forecast/q/'+ process.env.WEATHER_LOCATION +'.json',
  json: true
};
console.log(options.url);

request(options, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var forecast = parseForecast(body);
    console.log('The forecast is ' + forecast);

    console.log('Sending to device...');

    particle.callFunction({
      deviceId: process.env.TEMPERATURE_PARTICLE_DEVICE_ID,
      name: 'display', argument: forecast,
      auth: process.env.TEMPERATURE_PARTICLE_ACCESS_KEY
    })
    .then(
      function(data) {
        console.log('Done.');
      }, function(err) {
        console.log('An error occurred:', err);
      });
  }
  else {
    console.log('An error occurred:', error);
  }
});
