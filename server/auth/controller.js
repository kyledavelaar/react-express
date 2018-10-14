const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

const config = require('../../config');
const User = require('../user/schema');
const VerifyToken = require('./verifyToken');



router.post('/login', (req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      return res.status(500).send('Error on the server');
    }
    if (!user) {
      return res.status(404).send('No user found.');
    }
    
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ auth: false, token: null });
    }

    const token = jwt.sign( 
      { id: user._id },
      config.secret,
      { expiresIn: 86400 }  // 24 hours 
    )
    res.status(200).send({ auth: true, token});
  })
})



router.get('/me', VerifyToken, (req, res) => {
    
  // {password: 0} is a projection so password doesn't get sent in res
  User.findById(req.userId, {password: 0}, (err, user) => {
    if (err) {
      const message = 'There was a problem finding the user.';
      return res.status(500).send(message);
    }
    if (!user) {
      return res.status(404).send('No user found.');
    }
    res.status(200).send(user);
  });

});



router.post('/register', function(req, res) {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      return res.status(500).send('Error on the server');
    }
    if (user) {
      return res.status(400).send('That username already exists, please choose another.');
    }
  })
  
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  
  User.create({
    username : req.body.username,
    password : hashedPassword
  },
  (err, user) => {
    if (err) {
      const message = 'There was a problem registering the user.';
      return res.status(500).send(message);
    }
    // create a token
    const token = jwt.sign(
      { id: user._id }, 
      config.secret, 
      { expiresIn: 86400 } // 24 hours
    );
    res.status(200).send({ auth: true, token: token });
  }); 
});







module.exports = router;