var asyncAdd = (a,b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(typeof a === 'number' && typeof b === 'number'){
                resolve(a + b);
            } else {
                reject('Arguments must be numbers');
            }
        }, 1500);
    })
}

asyncAdd(5, '7').then(res => {
    console.log('Data: ', res)
    return asyncAdd(res, 33);
}, (errorMessage) => {
    console.log(errorMessage)
}).then((res) => {
    console.log('Should be 45: ', res)
}, (errorMessage) => {
    console.log(errorMessage)
})

// var somePromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('Hey it worked')
//         reject('unable to fulfill promise')
//     }, 2500)
    
// });

// somePromise.then( (message) => {
//     console.log('succes! :', message)
// }, (errorMessage) => {
//     console.log('error! ', errorMessage)
// })