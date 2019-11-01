const express = require('express');
const router = express.Router();
const Photo = require('../models/photos.js');
const User = require('../models/users.js');

router.get('/', async (req, res)=>{
    try {
        const foundPhotos = await Photo.find({})
        res.render('photos/index', {
            photos: foundPhotos,
            isLogged: req.session.logged,
            username: req.session.username,
        });
    } catch(err) {
        res.send(err);
    }
});
     
router.get('/new', async (req, res) => {
    try {
        console.log(req.session, req.body);
        res.render('photos/new.ejs', {
            isLogged: req.session.logged,
        });
    } catch(err) {
        res.send(err);
    }
})
    
    // const user = await User.findById(req.body.usedID)

module.exports = router;