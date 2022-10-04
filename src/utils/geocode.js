const request = require('postman-request')


const geocode = (address, callback) => {
  console.log(encodeURIComponent(address));
  const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoidGFybnkiLCJhIjoiY2w4aDFrMnU2MHUyeTN2cXhoMWF6OXJsbyJ9.nQyTScHDDcZFUVqbBI36TQ";

  request({url , json : true}, (error,{body}) => {
    
    if(error) {
      callback('Unable to connect to lacation services!', undefined)
    } else if(body.features.length === 0) {
      callback('Unable to find location. Try another search.', undefined)
    } else {
      
       callback(undefined,{
        location:body.features[0].place_name,
        latitude:body.features[0].center[1],
        longitude:body.features[0].center[0]
       });
    }
  })
}

module.exports = geocode;