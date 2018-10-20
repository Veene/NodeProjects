const request = require('request');

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const key = "key=zE73irn2qSoMthtnXR06gqYXGZCXWZdH"
            const url = `http://www.mapquestapi.com/geocoding/v1/address?${key}&location=${encodeURIComponent(address)}`
            console.log(url)

            request({
                url: url,
                json: true
            }, (error, response, body) => {
                if(error) {
                    reject('unable to connect to servers properly')
                } else if (body.info.statuscode === 400) {
                    reject('unable to find that adress')
                } else if (body.info.statuscode === 0) {
                    resolve({
                        address: response.body.results[0].locations[0].street,
                        latitude: response.body.results[0].locations[0].latLng.lat,
                        longitude: response.body.results[0].locations[0].latLng.lng
                    })
                }
                // console.log(JSON.stringify(body, undefined, 0))
                
            })
        },1500)
    })
}

geocodeAddress('0000').then((location) => {
    console.log('info: ', JSON.stringify(location, undefined, 2))
}).catch(error => {
    console.log(error)
})