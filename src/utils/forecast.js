const request = require('request')



const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=bf64e5350c3fa3737acc4174c2231fce&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)
    request({url, json:true}, (error,{body}) => {
        if(error){
            callback('Unable to connect to location services')
        }
        else if(body.error){
            callback('Unable to find location',undefined)
        }
        else{
            callback(undefined, body.current.weather_descriptions[0] + ', The Temperature is ' + body.current.temperature + ' And its feel like ' + body.current.feelslike)
        }
    })
}
module.exports = forecast