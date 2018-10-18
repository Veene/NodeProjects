// var square = (x) => x*x
// console.log(square(8))

// var user = {
//     name: 'John',
//     sayHi: () => {
//         console.log('hi, Im: ', this.name)
//     },
//     sayHiAlt () {
//         console.log('hi, im ', this.name)
//     }
// };

// user.sayHi()
// user.sayHiAlt()

const user = {
    name: "Adam",
    sayHi: function () {
        console.log(this.name)
    }
}
 
const anotherUser = Object.create(user)
anotherUser.name = "Andrew"
 
user.sayHi() // outputs "Adam"
anotherUser.sayHi() // still outputs "Adam" instead of "Andrew"