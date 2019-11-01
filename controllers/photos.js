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
     



module.exports = router;