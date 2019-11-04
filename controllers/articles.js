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
        req.session.logged = true;
        res.render('articles/new.ejs', {
            message: req.session.message,
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
        req.session.message = 'You must be logged in to perform this action';
        res.redirect('/');
    }
});


router.get('/:id', async (req, res)=>{
    try {
        const foundUser = await User.findOne({'articles': req.params.id})
        .populate({path: 'articles', match: {_id: req.params.id}});
        res.render('articles/show.ejs', {
            user: foundUser,
            article: foundUser.articles[0],
      });
    } catch(err) {
        res.send(err)
    }
});


router.get('/:id/edit', async (req, res)=>{
    try {
        const foundArticle = await Article.findById(req.params.id);
        res.render('articles/edit.ejs', {
            article: foundArticle,
        });
    } catch(err) {
        res.send(err);
    }
});
router.put('/:id', async (req, res)=>{
    try {
        const updatedArticle = await Article.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/articles');
    } catch(err) {
        res.send(err);
    }
});


router.delete('/:id', async (req, res)=>{
    try {
        const deletedArticle = await Article.findByIdAndRemove(req.params.id);
        const foundUser = await User.findOne({'articles': req.params.id});
        foundUser.articles.remove(req.params.id);
        await foundUser.save();
        res.redirect('/articles');
    } catch(err) {
        res.send(err);
    }
});


module.exports = router;