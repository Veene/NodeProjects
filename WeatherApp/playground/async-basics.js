console.log('Starting app')

setTimeout(() => {
    console.log('inside of callback')
}, 2000);

setTimeout(() => {
    console.log('no ms added')
},0)

console.log('finishing up');