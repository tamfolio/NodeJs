const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')



//express app 
const app = express();
//connect to mongoDB
const dbURI = 'mongodb+srv://tamilore:ayobami20@nodetuts.dyfyzql.mongodb.net/node-tuts?retryWrites=true&w=majority'
mongoose.connect(dbURI)
    .then((result) => app.listen(5000))
    .catch((err) => console.log(err))
    //register view engine
app.set('view engine', 'ejs');


//listen for requests


//middleware and static files
app.use(express.static('public'));

app.use(morgan('dev'));



app.get('/', (req, res) => {
    const blogs = [
        { title: 'I am a front end Dev', snippet: 'lorem ipsum dolor sit amet consectetur' },
        { title: 'I am a full stack Dev', snippet: 'lorem ipsum dolor sit amet consectetur' },
        { title: 'I am a Dev', snippet: 'lorem ipsum dolor sit amet consectetur' }
    ]
    res.render('index', { title: 'Home', blogs })
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'about' });
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' })
})

//404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})