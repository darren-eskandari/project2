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



module.exports = router;
