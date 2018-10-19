const request = require('request');

const key = "key=zE73irn2qSoMthtnXR06gqYXGZCXWZdH"
const url = `http://www.mapquestapi.com/geocoding/v1/address?${key}&location=1301%20lombard%20street%20philadelphia`

request({
    url: url,
    json: true
}, (error, response, body) => {
    // console.log(JSON.stringify(body, undefined, 0))
    // console.log(JSON.stringify(body, undefined, 2))
    console.log("latitude: ", body.results[0].locations[0].latLng.lat)
    console.log("longitude: ", body.results[0].locations[0].latLng.lng)
})