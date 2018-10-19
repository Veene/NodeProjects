var key = "key=zE73irn2qSoMthtnXR06gqYXGZCXWZdH"
var url = `http://www.mapquestapi.com/geocoding/v1/address?${key}&location=1301%20lombard%20street%20philadelphia`
// var latitude = body.results[0].locations[0].latLng.lat

var getUser = (id, callback) => {
    var user = {
        id: id,
        name: 'Vikram'
    };

    setTimeout(() => {
        callback(user);
    }, 3000);
};

getUser(31, (userObject) => {
    console.log(userObject)
})