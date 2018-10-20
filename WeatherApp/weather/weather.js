const request = require('request');

let temperature = ((lat=43.570432, long=-79.780128, callback) => {
    const key = `bea6aad47b704d04b6dc58188869bdc1`
    const url = `https://api.darksky.net/forecast/${key}/${lat},${long}`
    
    request({
        url: url,
        json: true
    },(err, res, body) => {
        if(!err && res.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            })
        } else {
            callback('unable to fetch weather');
        }
    })

})

module.exports.temperature = temperature