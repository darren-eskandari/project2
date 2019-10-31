const express = require('express');
const router  = express.Router();
const User    = require('../models/users');
const bcrypt  = require('bcryptjs');

router.post('/registration', async (req, res) => {
    const password = req.body.password;
    const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    
    const userDbEntry = {};
    userDbEntry.username = req.body.username;
    userDbEntry.email    = req.body.email;
    userDbEntry.password = passwordHash;
    
    try {  
      const createdUser = await User.create(userDbEntry);
      console.log(createdUser);
      req.session.username = createdUser.username;
      req.session.logged = true;
    
      res.redirect('/')
    } catch(err) {
      res.send(err)
    }
});


router.post('/login', async (req, res) => {
    try {
      // Does user already exist
      const foundUser = await User.findOne({username: req.body.username});
  
      if(foundUser){
        // if yes, compare passwords
        if(bcrypt.compareSync(req.body.password, foundUser.password)){
          req.session.message = '';
          req.session.username = foundUser.username;
          req.session.logged   = true;
          console.log(req.session, req.body)
  
          res.redirect('/')
        
        // if user exist but password incorrect return to login
        } else {
          console.log('else in bcrypt compare')
          req.session.message = 'Username or password are incorrect';
          res.redirect('/')
        }
  
      // if user does not exist return to login
      } else {
        req.session.message = 'Username or password are incorrect';
        res.redirect('/')
      }
    } catch(err){
      console.log('hitting', err)
      res.send(err);
    }
});


module.exports = router;
