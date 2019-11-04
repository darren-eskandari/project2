const express = require('express');
const router = express.Router();
const Photo = require('../models/photos.js');
const User = require('../models/users.js');


router.get('/', async (req, res)=>{
    try {
        const foundPhotos = await Photo.find({})
        res.render('photos/index', {
            photos: foundPhotos,
        });
    } catch(err) {
        res.send(err);
    }
});
     

router.get('/new', async (req, res) => {
    try {
        console.log(req.session, req.body);
        res.render('photos/new.ejs');
    } catch(err) {
        res.send(err);
    }
})
router.post('/', async (req, res) => {
    try {
        const createdPhoto = await Photo.create(req.body);
        const currentUser = await User.findById(req.session.userId);
        currentUser.photos.push(createdPhoto);
        await currentUser.save()
        res.redirect('/photos');
    } catch(er) {
        res.send(err);
    }
});


router.get('/:id', async (req, res)=>{
    try {
        const foundUser = await User.findOne({'photos': req.params.id})
        .populate({path: 'photos', match: {_id: req.params.id}});
        res.render('photos/show.ejs', {
            user: foundUser,
            photo: foundUser.photos[0],
      });
    } catch(err) {
        res.send(err)
    }
});


router.get('/:id/edit', async (req, res)=>{
    try {
        const foundPhoto = await Photo.findById(req.params.id);
        res.render('photos/edit.ejs', {
            photo: foundPhoto,
        });
    } catch(err) {
        res.send(err);
    }
});
router.put('/:id', async (req, res)=>{
    try {
        const updatedPhoto = await Photo.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/photos');
    } catch(err) {
        res.send(err);
    }
});


router.delete('/:id', async (req, res)=>{
    try {
        const deletedPhoto = await Photo.findByIdAndRemove(req.params.id);
        const foundUser = await User.findOne({'photos': req.params.id});
        foundUser.photos.remove(req.params.id);
        await foundUser.save();
        res.redirect('/photos');
    } catch(err) {
        res.send(err);
    }
});


module.exports = router;