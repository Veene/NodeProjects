var db = require('./db.js')

module.exports.handleSignup = (email, password) => {
    //check if email exists
    
    //save user to db
    db.saveUser({
        email: email,
        password: password,
    })
    //send the welcome email

}