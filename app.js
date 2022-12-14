const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')
const Blog = require('./models/blog');
const { render } = require('ejs');



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
app.use(express.urlencoded({ extended: true }))


//routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
})


//blog routes
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result })
        })
        .catch((err) => {
            console.log(err)
        })
});

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body)

    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        })
})

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id
    Blog.findById(id)
        .then((result) => {
            render('details', { blog: result, title: 'Blog Details' })
        })
        .catch(err => {
            console.log(err)
        })
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