const express            = require('express');
const app                = express();
const session            = require('express-session');
const methodOverride     = require('method-override');

const usersController    = require('./controllers/users');
const articlesController = require('./controllers/articles');
const photosController   = require('./controllers/photos');

require('./db/db');

app.use(session({
    secret: "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    resave: false,
    saveUninitialized: false
}));

app.use((req,res,next) => {
    res.locals.user = req.session.user || {}
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
        isLogged: req.session.logged,
    })
});
  
app.get('/signup', (req, res) => {
    res.render('signup', {
        message: req.session.message,
        isLogged: req.session.logged,
    })
});

app.get('/',(req, res) => {
    res.render('index', {
        isLogged: req.session.logged,
        message: req.session.message,
        logOut: req.session.logOutMsg,
        username: req.session.username,
    });
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});