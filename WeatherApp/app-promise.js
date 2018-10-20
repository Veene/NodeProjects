const yargs = require('yargs');
const axios = require('axios');

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

var address = argv.address
const mapKey = "key=zE73irn2qSoMthtnXR06gqYXGZCXWZdH"
const Mapurl = `http://www.mapquestapi.com/geocoding/v1/address?${mapKey}&location=${encodeURIComponent(address)}`


axios.get(Mapurl).then((res) => {
    if(res.data.info.statuscode !== 0){
        throw new Error('An error has occured with the request')
    }
    // console.log(data)
    let latitude = res.data.results[0].locations[0].latLng.lat
    let longitude = res.data.results[0].locations[0].latLng.lng
    const weatherKey = `bea6aad47b704d04b6dc58188869bdc1`;
    const weatherUrl = `https://api.darksky.net/forecast/${weatherKey}/${latitude},${longitude}`;
    return axios.get(weatherUrl)
    }).then((res) => {
        console.log(res.data.currently.temperature, res.data.currently.apparentTemperature)
    }).catch((error) => {
        console.log(error)
    })
