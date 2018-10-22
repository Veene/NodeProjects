const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express(); 

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')
//middleware basically below

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`

    console.log(log)
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('unable to append to server.log')
        }
    })
    next();
})
//this middleware with no next always renders maintanence we get nothing else
// app.use((req, res, next)=>{
//     res.render('maintenance.hbs')
// })

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

//request, response is EXPRESS specific!!!!
app.get('/', (req, res) => {
    // res.send('<h1>hello express!</h1>')
    res.send({
        name: 'John', 
        likes: [
            'Biking',
            'Coding'
        ]
    })
});

app.get('/home', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'This is the home page!'
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    })
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: "unable to handle request"
    })
})
app.listen(3000, () =>{
    console.log('server starting up on port 3000')
});