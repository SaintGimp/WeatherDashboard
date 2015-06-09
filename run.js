var spark =require('spark');
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

spark.on('login', function() {
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

      console.log('Sending to Spark...');
      spark.callFunction(process.env.SPARK_DEVICE_ID, 'display', forecast);

      console.log('Done.');
    }
  });
});

spark.login({accessToken: process.env.SPARK_ACCESS_KEY});