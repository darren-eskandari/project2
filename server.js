const express            = require('express');
const app                = express();
const session            = require('express-session');
const methodOverride     = require('method-override');

const usersController    = require('./controllers/users');
const articlesController = require('./controllers/articles');
const photosController   = require('./controllers/photos');

const Article   = require('./models/articles');
const Photo     = require('./models/photos');

require('dotenv').config()

require('./db/db');

const PORT = process.env.PORT

app.use(session({
    secret: "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    resave: false,
    saveUninitialized: false
}));

app.use((req,res,next) => {
    res.locals.user = req.session.user || {}
    res.locals.username = req.session.username
    res.locals.isLogged = req.session.logged,
    next()
})

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: false}));

app.use('/auth', usersController);
app.use('/articles', articlesController);
app.use('/photos', photosController);

app.get('/login', (req, res) => {
    res.render('login', {
    })
});
  
app.get('/signup', (req, res) => {
    res.render('signup', {
        message: req.session.message,
    });
});

app.get('/', async (req, res) => {
    try{
        const foundPhotos = await Photo.find({});
        const foundArticles = await Article.find({});
        res.render('index', {
            message: req.session.message,
            logOut: req.session.logOutMsg,
            photos: foundPhotos,
            articles: foundArticles,
        });
    } catch(err) {
        res.send(err)
    }
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});