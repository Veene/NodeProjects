const request = require('request');

var geocodeAddress =  function (address, callback) {
    const key = "key=zE73irn2qSoMthtnXR06gqYXGZCXWZdH"
    const url = `http://www.mapquestapi.com/geocoding/v1/address?${key}&location=${encodeURIComponent(address)}`
    console.log(url)

    request({
        url: url,
        json: true
    }, (error, response, body) => {
        if(error) {
            callback('unable to connect to servers properly')
        } else if (body.info.statuscode === 400) {
            callback('unable to find that adress')
        } else if (body.info.statuscode === 0) {
            callback(undefined, {
                address: body.results[0].locations[0].street,
                latitude: body.results[0].locations[0].latLng.lat,
                longitude: body.results[0].locations[0].latLng.lng
            })
        }
        // console.log(JSON.stringify(body, undefined, 0))
        
    })
}

module.exports = {
    geocodeAddress: geocodeAddress
}
