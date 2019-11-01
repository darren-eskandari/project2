const express = require('express');
const router  = express.Router();
const Article  = require('../models/articles');
const Author   = require('../models/users');


router.get('/', async (req, res)=>{
    try {
        const foundArticles = await Article.find({})
        res.render('Articles/index', {
            articles: foundArticles,
            isLogged: req.session.logged
        });
    } catch(err) {
        res.send(err);
    }
});


module.exports = router;