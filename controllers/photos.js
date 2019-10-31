const express = require('express');
const router = express.Router();
const Photo = require('../models/photos.js');
const User = require('../models/users.js');

router.get('/', (req, res)=>{
    Photo.find({}, (err, foundPhotos)=>{
        if(err){
            res.send(err);
        } else {
            res.render('photos/index', {
                photos: foundPhotos
            });
        }
    });
});


module.exports = router;