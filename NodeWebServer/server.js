const express = require('express');

var app = express(); 

app.use(express.static(__dirname + '/public'));

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

app.get('/about', (req, res) => {
    res.send('About page')
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: "unable to handle request"
    })
})
app.listen(3000, () =>{
    console.log('server starting up on port 3000')
});