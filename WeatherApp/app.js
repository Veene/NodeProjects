const request = require('request');
const yargs = require('yargs');

const argv = yargs.options({
    a: {
        demand: true,
        alias: 'address',
        describe: 'Address to fetch weather for',
        string: true
    }
})
.help()
.alias('help', 'h')
.argv;

console.log(argv)

const key = "key=zE73irn2qSoMthtnXR06gqYXGZCXWZdH"
const url = `http://www.mapquestapi.com/geocoding/v1/address?${key}&location=${encodeURIComponent(argv.address)}`
console.log(url)

request({
    url: url,
    json: true
}, (error, response, body) => {
    // console.log(JSON.stringify(body, undefined, 0))
    console.log("Address: ", body.results[0].locations[0].street, body.results[0].locations[0].adminArea5, body.results[0].locations[0].adminArea1)
    console.log("latitude: ", body.results[0].locations[0].latLng.lat)
    console.log("longitude: ", body.results[0].locations[0].latLng.lng)
})