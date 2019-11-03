const express = require('express');
const router  = express.Router();
const Article  = require('../models/articles');
const User   = require('../models/users');


router.get('/', async (req, res)=>{
    try {
        const foundArticles = await Article.find({})
        res.render('Articles/index', {
            articles: foundArticles,
        });
    } catch(err) {
        res.send(err);
    }
});


router.get('/new', async (req, res) => {
    try {
        console.log(req.session, req.body);
        res.render('articles/new.ejs', {
        });
    } catch(err) {
        res.send(err);
    }
})
router.post('/', async (req, res) => {
    try {
        const createdArticle = await Article.create(req.body);
        const currentUser = await User.findById(req.session.userId);
        currentUser.articles.push(createdArticle);
        await currentUser.save();
        res.redirect('/articles');
    } catch(err) {
        console.log(err);
        // res.send(err);
    }
});




module.exports = router;