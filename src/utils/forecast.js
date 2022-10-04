const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {

const url ='http://api.weatherstack.com/current?access_key=a786ea5cd8d6e2375d18d77b4a3e19b3&query='+latitude+','+longitude+'&units=m';

request({url, json: true},(error,{body}) => {
  if(error) {
    callback("Unable to connect to location servers!", undefined);
  } else if(body.error) {
    callback('Unable to find location. Try another search!',undefined);
  } else {
      callback(undefined,'Weather is '+body.current.weather_descriptions[0]+' are '+body.current.temperature+' degrees and it feel like '+body.current.feelslike+' degrees. Are '+body.current.precip+'% chance to rain!')
  }
})

} 

module.exports = forecast;